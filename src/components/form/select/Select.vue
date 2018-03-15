<template>
  <div
    class="vlk-select"
    :class="{
      'selected': selectedOption !== null,
      'opened': opened,
      'closed': !opened
    }"
    v-on-clickaway="closeDropdown"
    @click="toggleDropdown"
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
        v-for="option in options"
        :option="option"
        :options="options"
      >
        <li
          @click.stop="optionClicked(option.value)"
          :key="option.value"
          :class="{'current-option': (selectedOption && option.value === selectedOption.value) }
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
    }
  },
  data () {
    return {
      opened: false,
      selectedOption: null
    }
  },
  watch: {
    value (val, old) {
      this.selectOption(val)
    }
  },
  methods: {
    toggleDropdown () {
      this.opened = !this.opened
    },

    closeDropdown () {
      this.opened = false
    },

    optionClicked (value) {
      this.closeDropdown()
      this.selectOption(value)
    },

    getOptionByValue (value) {
      return this.options.filter((item) => {
        return item.value === value
      })[0]
    },

    selectOption (value) {
      const option = this.getOptionByValue(value)
      // if (!option) throw new Error('Option with value "' + value + '" wasn\'t found')
      if (!option) return
      this.selectedOption = option
      this.$emit('input', option.value)
    }
  },
  created () {
    this.selectOption(this.value)
  }
}
</script>
