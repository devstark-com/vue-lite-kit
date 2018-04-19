<template>
  <component
    class="vlk-dropdown"
    :is="tag"
    :class="wrapperClasses"
    v-on-clickaway="close"
  >
    <component
      class="vlk-dropdown-trigger"
      :is="triggerTag"
      @click="toggle"
    >
      <slot name="trigger" />
    </component>
    <transition :name="animation">
      <component
        :is="contentTag"
        class="vlk-dropdown-content"
        v-show="opened"
      >
        <slot name="content" :vm="vm" />
      </component>
    </transition>
  </component>
</template>
<script>
import { mixin as mixClickAway } from 'vue-clickaway'
export default {
  name: 'Dropdown',
  mixins: [
    mixClickAway
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'is-bottom-right',
      validator (val) {
        return ['is-top-right', 'is-top-left', 'is-bottom-right', 'is-bottom-left'].includes(val)
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    triggerTag: {
      type: String,
      default: 'div'
    },
    contentTag: {
      type: String,
      default: 'div'
    },
    animation: {
      type: String,
      default: 'fade'
    }
  },
  data () {
    return {
      opened: false
    }
  },
  computed: {
    vm () {
      return this
    },

    wrapperClasses () {
      return {
        'is-disabled': this.disabled,
        'is-opened': this.opened,
        'is-closed': !this.opened,
        [this.position]: true
      }
    }
  },
  methods: {
    toggle () {
      if (this.disabled) return
      this.opened = !this.opened
    },

    close () {
      this.opened = false
    }
  }
}
</script>
