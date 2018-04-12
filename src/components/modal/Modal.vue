<template>
  <transition :name="animation">
    <div v-if="opened" class="modal">
      <div class="modal-background" @click="cancel('overlay')"/>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 960
    },
    animation: {
      type: String,
      default: null
    },
    scroll: {
      type: [String, Object, Function],
      default: null
    },
    cancelOptions: {
      type: [Array, Boolean],
      default: () => ['esc', 'overlay']
    }
  },
  watch: {
    opened () {
      this.handleScroll()
    }
  },
  methods: {
    handleScroll () {
      if (!this.scroll) return
      if (typeof this.scroll === 'function') return this.scroll(this.opened)
      let rules = {}
      if (typeof this.scroll === 'string') rules.html = this.scroll
      if (typeof this.scroll === 'object') rules = {...this.scroll}
      this.applyScrollRules(rules)
    },

    applyScrollRules (rules) {
      if (typeof window === 'undefined') return
      if (rules.html) document.documentElement.classList.toggle(rules.html, this.opened)
      if (rules.body) document.body.classList.toggle(rules.html, this.opened)
    },

    checkIsCancelOptionAllowed (option) {
      return this.cancelOptions.includes(option)
    },

    cancel (option) {
      if (!this.cancelOptions || !this.checkIsCancelOptionAllowed(option)) return
      this.close()
    },

    close () {
      this.$emit('update:opened', false)
      this.$emit('closed')
    },

    keyPressHandler (event) {
      // Esc key
      if (this.opened && event.keyCode === 27) this.cancel('esc')
    }
  },
  created () {
    if (typeof window !== 'undefined' && this.checkIsCancelOptionAllowed('esc')) {
      document.addEventListener('keyup', this.keyPressHandler)
    }
  },
  onBeforeDestroy () {
    if (typeof window !== 'undefined' && this.checkIsCancelOptionAllowed('esc')) {
      document.removeEventListener('keyup', this.keyPressHandler)
    }
  }
}
</script>
