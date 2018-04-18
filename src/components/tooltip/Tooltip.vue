<template>
  <transition :name="effect">
    <div
      class="tooltip"
      role="tooltip"
      ref="tooltip"
      v-on-clickaway="() => $emit('clickaway')"
      :data-tooltip="dataAttrValue"
      :class="{
        'top':    placement === 'top',
        'left':   placement === 'left',
        'right':  placement === 'right',
        'bottom': placement === 'bottom'
      }"
      :style="{
        top: top + 'px',
        left: left + 'px'
      }"
    >{{ content }}</div>
  </transition>
</template>
<script>
import { mixin as mixClickAway } from 'vue-clickaway'
import config from '@/config/'
const LINK_PREFIX = config.options.tooltipLinkPrefix
export default {
  name: 'Tooltip',
  mixins: [
    mixClickAway
  ],
  props: {
    uid: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    placement: {
      type: String,
      default: 'top'
    },
    effect: {
      type: String,
      default: null
    },
    top: {
      type: Number
    },
    left: {
      type: Number
    }
  },
  computed: {
    dataAttrValue () {
      return this.uid ? (LINK_PREFIX + this.uid) : false
    }
  }
}
</script>
