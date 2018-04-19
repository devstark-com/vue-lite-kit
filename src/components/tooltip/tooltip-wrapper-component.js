import Vue from 'vue'
import TooltipComponent from './Tooltip.vue'

const TooltipWrapperComponent = Vue.extend({
  components: {
    TooltipComponent
  },
  data () {
    return {
      target: null,
      state: null,
      options: {
        uid: null,
        content: null,
        placement: 'top',
        effect: 'fade'
      }
    }
  },
  render (createElement) {
    return createElement(TooltipComponent, {
      props: {
        target: this.target,
        options: this.options,
        state: this.state
      }
    })
  }
})

export default TooltipWrapperComponent
