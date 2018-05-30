<template>
  <div
    tabindex="0"
    class="vlk-select"
    :class="{
      'selected': !!hasSelection,
      'opened': opened,
      'closed': !opened
    }"
    v-on-clickaway="closeDropdown"
    @click="toggleDropdown"
    @keydown.up.prevent="onArrowUp"
    @keydown.down.prevent="onArrowDown"
    @keydown.enter="onEnter"
    @keydown.tab="onTab"
    @keydown.esc="onEsc"
    @focus="onFocus"
    @blur="onBlur"
  >
    <label v-if="label">{{ label }}</label>
    <div class="vlk-form-control">
      <i class="icon-before"></i>
      <div class="select">
        <span v-if="hasSelection">{{ !multi ? selectedOptionLabel : '(' + selection.length + ') items selected' }}</span>
      </div>
      <i class="icon-after"></i>
    </div>
    <ul class="vlk-options" v-if="opened">
      <slot
        name="option"
        v-for="option in optionsList"
        :option="option"
        :options="optionsList"
        :onClick="onOptionClicked"
        :selected="hasSelection && selection.includes(option.value)"
        :current="currentOption && option.value === currentOption.value"
      >
        <li
          @click.stop="onOptionClicked(option.value)"
          :key="option.value"
          :class="{
            'selected': (hasSelection && selection.includes(option.value)),
            'current': (currentOption && option.value === currentOption.value)
          }
        ">
          {{ option.label }}
        </li>
      </slot>
    </ul>
  </div>
</template>
<script>
import { mixin as mixClickAway } from 'vue-clickaway'

const isDiff = (a, b) => {
  return !Array.isArray(b) || a.some(item => !b.includes(item)) || b.some(item => !a.includes(item))
}

export default {
  name: 'Select',
  mixins: [
    mixClickAway
  ],
  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    label: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
    openOnFocus: {
      type: Boolean,
      default: false
    },
    selectOnClose: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    },
    instantUpdate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      opened: false,
      currentOptionIndex: null,
      selection: []
    }
  },
  computed: {
    optionsList () {
      return this.options.map((item, index) => {
        return {
          index,
          ...item
        }
      })
    },

    hasOptions () {
      return this.optionsList.length > 0
    },

    hasSelection () {
      return this.selection.length > 0
    },

    firstOption () {
      return this.optionsList[0]
    },

    lastOption () {
      const lastIndex = this.optionsList.length - 1
      return this.optionsList[lastIndex]
    },

    selectedOptionLabel () {
      if (this.multi) return null
      const option = this.findOptionByField('value', this.selection[0])
      return !option ? null : option.label
    },

    currentOption () {
      return this.findOptionByField('index', this.currentOptionIndex)
    }
  },
  watch: {
    value (val, old) {
      this.updateSelectionFromValue(val)
    },

    optionsList () {
      // @todo reset appropriate props in data when options list changed in the parent component
    }
  },
  methods: {
    onArrowUp () {
      if (!this.opened) return this.openDropdown()
      this.prev()
    },

    onArrowDown () {
      if (!this.opened) return this.openDropdown()
      this.next()
    },

    onEnter () {
      if (!this.opened) return this.openDropdown()
      this.handleOptionSelection(this.currentOption.value)
      if (!this.multi) this.closeDropdown()
    },

    onTab () {
      if (this.opened) return this.closeDropdown()
    },

    onEsc () {
      if (this.opened) return this.closeDropdown()
    },

    onFocus () {
      if (this.openOnFocus && !this.opened) this.openDropdown()
      this.$emit('focus')
    },

    onBlur () {
      this.$emit('blur')
    },

    onOptionClicked (val) {
      this.handleOptionSelection(val)
      if (!this.multi) this.closeDropdown(true)
    },

    prev () {
      const prevOptionIndex = this.currentOption.index - 1
      const prevOption = this.findOptionByField('index', prevOptionIndex)
      const newCurrentOption = prevOption || this.lastOption
      this.setCurrentOption(newCurrentOption.index)
    },

    next () {
      const nextOptionIndex = this.currentOption.index + 1
      const nextOption = this.findOptionByField('index', nextOptionIndex)
      const newCurrentOption = nextOption || this.firstOption
      this.setCurrentOption(newCurrentOption.index)
    },

    getFirstSelectedOptionIndex () {
      const firstSelectOptionIndex = this.optionsList.findIndex((el, index) => {
        return this.selection.includes(el.value)
      })

      return firstSelectOptionIndex < 0 ? 0 : firstSelectOptionIndex
    },

    toggleDropdown () {
      this.opened ? this.closeDropdown() : this.openDropdown()
    },

    openDropdown () {
      if (!this.hasOptions) return
      const currentOptionIndex = this.getFirstSelectedOptionIndex()
      this.setCurrentOption(currentOptionIndex)
      this.opened = true
      this.$emit('open')
    },

    closeDropdown (preventSelectOnClose = false) {
      if (!this.multi) {
        if (this.selectOnClose &&
          preventSelectOnClose !== true &&
          this.currentOption.value !== this.selection[0]
        ) {
          this.handleOptionSelection(this.currentOption.value)
        }
      } else if (!this.instantUpdate) {
        this.updateVModel()
      }

      this.opened = false
      this.$emit('close')
    },

    setCurrentOption (index) {
      if (this.currentOptionIndex === index) return
      this.currentOptionIndex = index
      const currentOptionValue = this.currentOption ? this.currentOption.value : 0
      this.$emit('current', currentOptionValue)
    },

    updateSelectionFromValue (val) {
      if (val === null) return
      this.selection = this.multi ? [...val] : [val]
    },

    isSelected (val) {
      return this.selection.indexOf(val) !== -1
    },

    handleOptionSelection (val) {
      if (!this.multi) {
        if (!this.isSelected(val)) {
          this.selection = [val]
          this.updateVModel()
        }
      } else {
        this.isSelected(val) ? this.unselectOption(val) : this.selectOption(val)
        if (this.instantUpdate) this.updateVModel()
      }
    },

    selectOption (val) {
      if (this.isSelected(val)) throw new Error('Attempt to select already selected value "' + val + '"')
      this.selection.push(val)
    },

    unselectOption (val) {
      if (!this.isSelected(val)) throw new Error('Attempt to unselect not selected value "' + val + '"')
      const indexToRemove = this.selection.indexOf(val)
      this.selection.splice(indexToRemove, 1)
    },

    isSelectionChanged (newValue) {
      if (!this.multi) return newValue !== this.value
      return isDiff(newValue, this.value)
    },

    updateVModel () {
      const newValue = this.multi ? this.selection : this.selection[0]
      if (!this.isSelectionChanged(newValue)) return
      this.$emit('input', newValue)
    },

    findOptionByField (fieldName, value) {
      return this.optionsList.filter((item) => {
        return item[fieldName] === value
      })[0]
    }
  },
  created () {
    this.updateSelectionFromValue(this.value)
  }
}
</script>
