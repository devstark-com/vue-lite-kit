<template>
  <component :is="tag" class="vlk-upload-wrapper" @click.capture="onClickInside">
    <slot />
    <input
      type="file"
      ref="input"
      :multiple="multiple"
      :disabled="disabled"
      @change="onInputChange"
    />
  </component>
</template>
<script>
export default {
  name: 'Upload',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    value: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      internalValue: this.value || []
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     *   2. Reset input value if array is empty
     */
    value (value) {
      this.newValue = value
      if (!this.newValue.length === 0) this.$refs.input.value = null
    }
  },
  methods: {
    onClickInside (e) {
      if (this.disabled) return
      this.$refs.input.click()
      this.$emit('input:clicked')
    },

    onInputChange (e) {
      if (this.disabled) return
      const value = e.target.files || e.dataTransfer.files
      if (!value || !value.length) {
        console.log(e)
        return
      }

      const files = Array.from(value)
      this.internalValue = files
      this.$emit('input', this.internalValue)
    }
  }
}
</script>
