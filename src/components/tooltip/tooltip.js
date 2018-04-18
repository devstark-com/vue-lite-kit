import Vue from 'vue'
// import config from '@/config/'
import manager from './manager.js'
import EventListener from '@/utils/event-listener.js'
import updatePosition from './update-position.js'
import TooltipWrapperComponent from './tooltip-wrapper-component'

const Tooltip = () => {
  return {
    target: null,
    options: {
      uid: null,
      trigger: 'hover',
      effect: 'scale',
      placement: 'top',
      content: null,
      shift: 0.33
    },
    state: null,
    objTooltip: null,

    init (el, binding) {
      this.target = el
      this._initState()
      this._updateData(binding)
      this.bindEvents()
      return this
    },

    inserted () {
      this.state.setTargetInserted()
    },

    _initState () {
      this.state = new Vue({
        data () {
          return {
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
        }
      })
    },

    _updateData (binding) {
      this.options = {
        ...this.options,
        ...binding.value
      }
    },

    bindEvents () {
      if (this.options.trigger === 'hover') {
        this._mouseenterEvent = EventListener.listen(this.target, 'mouseenter', this.state.show)
        this._mouseleaveEvent = EventListener.listen(this.target, 'mouseleave', this.state.hide)
      } else if (this.options.trigger === 'focus') {
        this._focusEvent = EventListener.listen(this.target, 'focus', this.state.show)
        this._blurEvent = EventListener.listen(this.target, 'blur', this.state.hide)
      } else {
        this._clickEvent = EventListener.listen(this.target, 'click', this.state.toggle)
      }

      this._wResizeEvent = EventListener.listen(window, 'resize', this.updatePosition.bind(this))
      this._wScrollEvent = EventListener.listen(window, 'scroll', this.updatePosition.bind(this))

      this.state.$on('show', this.add.bind(this))
      this.state.$on('hide', this.remove.bind(this))
    },

    unbindEvents () {
      this._mouseenterEvent.remove()
      this._mouseleaveEvent.remove()
      this._focusEvent.remove()
      this._blurEvent.remove()
      this._clickEvent.remove()
      this._wResizeEvent.remove()
      this._wScrollEvent.remove()

      this.state.$off('show', this.add.bind(this))
      this.state.$off('hide', this.remove.bind(this))
    },

    add () {
      this.createTooltip()
      const tooltipEl = document.createElement('div')
      document.body.appendChild(tooltipEl)
      this.objTooltip.$mount(tooltipEl)
      const contentNode = this.getContentNode()
      if (contentNode) this.injectContentNode(contentNode)
      this.updatePosition()
    },

    remove () {
      const contentNode = this.getContentNode()
      if (contentNode) this.preserveContentNode(contentNode)
      this.destroy()
    },

    getContentNode () {
      return manager.getContent(this.options.uid, false)
    },

    hasContentNode () {
      return !!this.getContentNode()
    },

    injectContentNode (node) {
      this.objTooltip.$el.appendChild(node)
      node.style.display = 'block'
    },

    preserveContentNode (node) {
      node.style.display = 'none'
      node.parentNode.removeChild(node)
    },

    createTooltip () {
      this.destroy()
      this.objTooltip = new TooltipWrapperComponent({
        data: {
          uid: this.options.content,
          content: this.options.content,
          placement: this.options.placement,
          clickawayCallback: this.state.hide,
          top: -9999,
          left: -9999
          // ...this.options
          // effect: this.options.effect
        }
      })
    },

    updatePosition,

    update (binding) {
      // @todo update binding values, handle the case when uid is changed in binding
      // this.objTooltip.update...()
    },

    destroy () {
      if (!this.objTooltip) return
      const tooltipNode = this.objTooltip.$el
      tooltipNode.parentNode.removeChild(tooltipNode)
      this.objTooltip.$destroy()
      this.objTooltip = null
    }
  }
}

export default Tooltip
