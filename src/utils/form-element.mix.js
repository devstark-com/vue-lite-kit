export default {
  props: {
    // Native options to use in HTML5 validation
    autocomplete: String,
    maxlength: [Number, String]
  },
  methods: {
    onBlur ($event) {
      this.$emit('blur', $event)
    },

    onFocus ($event) {
      this.$emit('focus', $event)
    }
  }
}
