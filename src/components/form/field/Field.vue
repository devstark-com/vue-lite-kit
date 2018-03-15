<template>
  <div class="vlk-field" :class="fieldClasses">
    <label
      class="vlk-label"
      v-if="label"
      :for="labelFor"
    >{{ label }}</label>
    <slot/>
    <p class="vlk-field-message" v-if="message">{{ message }}</p>
  </div>
</template>
<script>
export default {
  name: 'Field',
  props: {
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    fieldClasses () {
      let classes = []
      if (this.type) classes.push(this.type)
      return classes
    }
  }
}
</script>
