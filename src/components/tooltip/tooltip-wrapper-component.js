import Vue from 'vue'
import TooltipComponent from './Tooltip.vue'

const TooltipWrapperComponent = Vue.extend({
  components: {
    TooltipComponent
  },
  data () {
    return {
      uid: null,
      content: null,
      placement: 'top',
      effect: 'scale',
      top: 0,
      left: 0
    }
  },
  methods: {
    updatePosition ({top, left}) {
      this.top = top
      this.left = left
    }
  },
  created () {
    // console.log('created')
  },
  render (createElement) {
    return createElement(TooltipComponent, {
      on: {
        clickaway: this.clickawayCallback
      },
      props: {
        uid: this.uid,
        content: this.content,
        placement: this.placement,
        effect: this.effect,
        top: this.top,
        left: this.left
      }
    })
  }
})

export default TooltipWrapperComponent
