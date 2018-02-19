<template>
  <div class="bbt-form-control" :class="wrapperClasses">
    <input
      class="bbt-input"
      ref="input"
      v-if="type !== 'textarea'"
      v-bind="$attrs"
      :type="type"
      :value="internalValue"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
    <textarea
      class="bbt-textarea"
      ref="textarea"
      v-else
      v-bind="$attrs"
      :value="internalValue"
      :maxlength="maxlength"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
    />
  </div>
</template>
<script>
import mixFormElement from '@/utils/form-element.mix.js'
export default {
  name: 'Input',
  inheritAttrs: false,
  mixins: [
    mixFormElement
  ],
  props: {
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    wrapperClasses: {
      type: [Array, Object]
    }
  },
  data () {
    return {
      internalValue: null
    }
  },
  watch: {
    /**
     * Set internal value when v-model is changed
     */
    value (value) {
      this.internalValue = value
    },

    /**
     * Update user's v-model
     */
    internalValue (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput (event) {
      this.$nextTick(() => { this.internalValue = event.target.value })
    }
  },
  created () {
    this.internalValue = this.value
  }
}
</script>
