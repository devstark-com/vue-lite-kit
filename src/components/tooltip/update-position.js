const updatePosition = function () {
  if (!this.objTooltip) return
  const arrowSize = 10
  const shift = this.options.shift
  setTimeout(() => {
    const targetRect = this.target.getBoundingClientRect()
    const tooltipRect = this.objTooltip.$el.getBoundingClientRect()
    switch (this.options.placement) {
      case 'top' :
        this.objTooltip.updatePosition({
          top: (targetRect.top - tooltipRect.height - arrowSize),
          left: (targetRect.left - tooltipRect.width / 2 + targetRect.width / 2)
        })
        break
      case 'top-left' :
        this.objTooltip.updatePosition({
          top: (targetRect.top - tooltipRect.height - arrowSize),
          left: (targetRect.left - tooltipRect.width * (1 - shift) + targetRect.width / 2)
        })
        break
      case 'top-right' :
        this.objTooltip.updatePosition({
          top: (targetRect.top - tooltipRect.height),
          left: (targetRect.left - tooltipRect.width * shift + targetRect.width / 2)
        })
        break
      case 'left':
        this.objTooltip.updatePosition({
          top: (targetRect.top + targetRect.height / 2 - tooltipRect.height / 2),
          left: (targetRect.left - tooltipRect.width)
        })
        break
      case 'right':
        this.objTooltip.updatePosition({
          top: (targetRect.top + targetRect.height / 2 - tooltipRect.height / 2),
          left: (targetRect.left + targetRect.width)
        })
        break
      case 'bottom':
        this.objTooltip.updatePosition({
          top: (targetRect.top + targetRect.height),
          left: (targetRect.left - tooltipRect.width / 2 + targetRect.width / 2)
        })
        break
      case 'bottom-left':
        this.objTooltip.updatePosition({
          top: (targetRect.top + targetRect.height),
          left: (targetRect.left - tooltipRect.width * (1 - shift) + targetRect.width / 2)
        })
        break
      case 'bottom-right':
        this.objTooltip.updatePosition({
          top: (targetRect.top + targetRect.height),
          left: (targetRect.left - tooltipRect.width * shift + targetRect.width / 2)
        })
        break
      default:
        console.log('Wrong tooltip placement prop')
    }
  }, 1)
}

export default updatePosition
