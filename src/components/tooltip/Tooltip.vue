<template>
  <transition :name="options.effect">
    <div
      class="tooltip"
      role="tooltip"
      v-on-clickaway="onCLickAway"
      :data-tooltip="dataAttrValue"
      :class="[options.placement]"
      :style="{
        top: top + 'px',
        left: left + 'px'
      }"
    >
      <div class="tooltip-inner" ref="inner" v-if="customContent"></div>
      <div class="tooltip-inner" ref="inner" v-else>{{ options.content }}</div>
      <div class="tooltip-arrow"></div>
    </div>
  </transition>
</template>
<script>
import config from '@/config/'
import manager from './manager.js'
import updatePosition from './update-position.js'
import EventListener from '@/utils/event-listener.js'
import { mixin as mixClickAway } from 'vue-clickaway'
const LINK_PREFIX = config.options.tooltipLinkPrefix
export default {
  name: 'Tooltip',
  mixins: [
    mixClickAway
  ],
  props: {
    target: {
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    state: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      top: -9999,
      left: -9999
    }
  },
  computed: {
    dataAttrValue () {
      return this.options.uid ? (LINK_PREFIX + this.options.uid) : false
    },

    customContent () {
      return manager.getContent(this.options.uid, false)
    }
  },
  methods: {
    updatePosition,
    onCLickAway () {
      if (this.options.trigger !== 'click') return
      this.state.hide()
    }
  },
  mounted () {
    this._wResizeEvent = EventListener.listen(window, 'resize', this.updatePosition.bind(this))
    this._wScrollEvent = EventListener.listen(window, 'scroll', this.updatePosition.bind(this))
    const node = this.customContent
    if (node) this.$refs.inner.appendChild(node)
    this.updatePosition()
  },
  beforeDestroy () {
    const node = this.customContent
    if (node) node.parentNode.removeChild(node)
  }
}
</script>
