<template>
  <transition :name="state.effect">
    <div
      class="vlk-tooltip-wrapper"
      role="tooltip"
      v-on-clickaway="onCLickAway"
      :data-tooltip="dataAttrValue"
      :class="[state.placement, state.position]"
      :style="{
        top: top + 'px',
        left: left + 'px'
      }"
    >
      <div class="vlk-tooltip" ref="inner" v-if="customContent"></div>
      <div class="vlk-tooltip" ref="inner" v-else>{{ state.content }}</div>
      <div class="vlk-tooltip-arrow"></div>
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
      return this.state.uid ? (LINK_PREFIX + this.state.uid) : false
    },

    customContent () {
      return manager.getContent(this.state.uid, false)
    }
  },
  methods: {
    updatePosition,
    onCLickAway () {
      if (this.state.trigger !== 'click') return
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
