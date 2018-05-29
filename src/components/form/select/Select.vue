<template>
  <div
    tabindex="0"
    class="vlk-select"
    :class="{
      'selected': !!selectedOption,
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
        <span v-if="selectedOption">{{ selectedOption.label }}</span>
      </div>
      <i class="icon-after"></i>
    </div>
    <ul class="vlk-options" v-if="opened">
      <slot
        name="option"
        v-for="option in optionsList"
        :option="option"
        :options="optionsList"
      >
        <li
          @click.stop="onOptionClicked(option.index)"
          :key="option.value"
          :class="{
            'selected': (selectedOption && option.value === selectedOption.value),
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
export default {
  name: 'Select',
  mixins: [
    mixClickAway
  ],
  props: {
    value: {
      type: [String, Number, Object],
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
    }
  },
  data () {
    return {
      opened: false,
      currentOptionIndex: null,
      selectedOptionIndex: null
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

    firstOption () {
      return this.optionsList[0]
    },

    lastOption () {
      const lastIndex = this.optionsList.length - 1
      return this.optionsList[lastIndex]
    },

    selectedOption () {
      return this.findOptionByField('index', this.selectedOptionIndex)
    },

    currentOption () {
      return this.findOptionByField('index', this.currentOptionIndex)
    }
  },
  watch: {
    value (val, old) {
      this.setSelectedByValue(val)
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
      this.selectOption(this.currentOptionIndex)
      this.closeDropdown()
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

    onOptionClicked (index) {
      this.selectOption(index)
      this.closeDropdown(true)
    },

    prev () {
      const prevOptionIndex = this.currentOptionIndex - 1
      const prevOption = this.findOptionByField('index', prevOptionIndex)
      const newCurrentOption = prevOption || this.lastOption
      this.setCurrentOption(newCurrentOption.index)
    },

    next () {
      const nextOptionIndex = this.currentOptionIndex + 1
      const nextOption = this.findOptionByField('index', nextOptionIndex)
      const newCurrentOption = nextOption || this.firstOption
      this.setCurrentOption(newCurrentOption.index)
    },

    toggleDropdown () {
      this.opened ? this.closeDropdown() : this.openDropdown()
    },

    openDropdown () {
      if (!this.hasOptions) return
      const currentOptionIndex = this.selectedOptionIndex || 0
      this.setCurrentOption(currentOptionIndex)
      this.opened = true
      this.$emit('open')
    },

    closeDropdown (preventSelectOnClose = false) {
      if (this.selectOnClose && !preventSelectOnClose && this.currentOptionIndex !== this.selectedOptionIndex) {
        this.selectOption(this.currentOptionIndex)
      }
      this.opened = false
      this.$emit('close')
    },

    setCurrentOption (index) {
      this.currentOptionIndex = index
      this.$emit('current', this.currentOption.value)
    },

    setSelectedByValue (value) {
      const selectedOption = this.findOptionByField('value', value)
      if (!selectedOption) return // @todo fire an error
      this.selectOption(selectedOption.index)
    },

    selectOption (index) {
      const option = this.findOptionByField('index', index)
      if (!option) {
        console.warn('Option with index "' + index + '" wasn\'t found')
        return
      }
      this.selectedOptionIndex = option.index
      this.$emit('input', option.value)
    },

    findOptionByField (fieldName, value) {
      return this.optionsList.filter((item) => {
        return item[fieldName] === value
      })[0]
    }
  },
  created () {
    this.setSelectedByValue(this.value)
  }
}
</script>
