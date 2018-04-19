import Vue from 'vue'
import TooltipComponent from './Tooltip.vue'

const TooltipWrapperComponent = Vue.extend({
  components: {
    TooltipComponent
  },
  data () {
    return {
      target: null,
      state: null
    }
  },
  render (createElement) {
    return createElement(TooltipComponent, {
      props: {
        target: this.target,
        state: this.state
      }
    })
  }
})

export default TooltipWrapperComponent
