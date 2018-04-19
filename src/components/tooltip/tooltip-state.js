import Vue from 'vue'
const TooltipState = Vue.extend({
  data () {
    return {
      uid: null,
      trigger: 'hover',
      effect: 'scale',
      placement: 'top',
      position: null,
      content: null,
      targetInserted: false,
      visible: false
    }
  },
  watch: {
    visible (val) {
      const eventName = val ? 'show' : 'hide'
      this.$emit(eventName)
    }
  },
  methods: {
    setTargetInserted () {
      this.targetInserted = true
    },
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    }
  },
  created () {
    // console.log(this.$data)
  }
})

export default TooltipState
