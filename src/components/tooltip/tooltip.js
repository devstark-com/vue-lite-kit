import TooltipState from './tooltip-state.js'
import EventListener from '@/utils/event-listener.js'
import TooltipWrapperComponent from './tooltip-wrapper-component'

const parseBinding = (binding) => {
  let options = {
    uid: null,
    trigger: [],
    placement: null,
    position: null,
    content: null,
    effect: null
  }

  let data = {
    ...options,
    ...binding.value
  }

  const modifiers = Object.keys(binding.modifiers)
  if (modifiers.length) {
    let placements = []
    let positions = []
    const placementOptions = ['top', 'right', 'bottom', 'left']
    const positionOptions = ['start', 'end']
    const triggerOptions = ['hover', 'click', 'focus']

    placementOptions.forEach(item => {
      if (modifiers.includes(item)) {
        placements.push(item)
        data.placement = item
      }
    })

    positionOptions.forEach(item => {
      if (modifiers.includes(item)) {
        positions.push(item)
        data.position = item
      }
    })

    triggerOptions.forEach(item => {
      if (modifiers.includes(item)) {
        data.trigger.push(item)
      }
    })

    if (placements.length > 1) console.warn('Tooltip placement: multiple definition: "' + placements.join(',') + '"')
    if (positions.length > 1) console.warn('Tooltip position: multiple definition: "' + positions.join(',') + '"')
  }

  // Set defaults
  if (!data.trigger.length) data.trigger.push('hover')
  if (!data.placement) data.placement = 'top'
  return data
}

const Tooltip = () => {
  return {
    target: null,
    state: null,
    objTooltip: null,

    init (el, binding) {
      this.target = el
      const data = parseBinding(binding)
      this.initState(data)
      this.bindEvents()
      return this
    },

    inserted () {
      this.state.setTargetInserted()
    },

    initState (data) {
      this.state = new TooltipState({data})
    },

    bindEvents () {
      if (this.state.trigger.includes('hover')) {
        this._mouseenterEvent = EventListener.listen(this.target, 'mouseenter', this.state.show)
        this._mouseleaveEvent = EventListener.listen(this.target, 'mouseleave', this.state.hide)
      }
      if (this.state.trigger.includes('focus')) {
        this._focusEvent = EventListener.listen(this.target, 'focus', this.state.show)
        this._blurEvent = EventListener.listen(this.target, 'blur', this.state.hide)
      }
      if (this.state.trigger.includes('click')) {
        this._clickEvent = EventListener.listen(this.target, 'click', this.state.toggle)
      }

      this.state.$on('show', this.add.bind(this))
      this.state.$on('hide', this.remove.bind(this))
    },

    // unbindEvents () {
    //   this._mouseenterEvent.remove()
    //   this._mouseleaveEvent.remove()
    //   this._focusEvent.remove()
    //   this._blurEvent.remove()
    //   this._clickEvent.remove()
    //   this._wResizeEvent.remove()
    //   this._wScrollEvent.remove()
    //
    //   this.state.$off('show', this.add.bind(this))
    //   this.state.$off('hide', this.remove.bind(this))
    // },

    add () {
      this.createTooltip()
      const tooltipEl = document.createElement('div')
      document.body.appendChild(tooltipEl)
      this.objTooltip.$mount(tooltipEl)
    },

    remove () {
      this.destroy()
    },

    createTooltip () {
      this.destroy()
      this.objTooltip = new TooltipWrapperComponent({
        data: {
          target: this.target,
          // options: {...this.options},
          state: this.state
        }
      })
    },

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
