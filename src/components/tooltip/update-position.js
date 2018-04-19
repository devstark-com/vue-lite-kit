const updatePosition = function () {
  setTimeout(() => {
    const targetRect = this.target.getBoundingClientRect()
    const tooltipRect = this.$el.getBoundingClientRect()
    switch (this.state.placement) {
      case 'top' :
        this.top = (targetRect.top - tooltipRect.height)
        if (this.state.position === 'start') {
          this.left = targetRect.left
        } else if (this.state.position === 'end') {
          const diff = targetRect.width - tooltipRect.width
          this.left = targetRect.left + diff
        } else {
          this.left = (targetRect.left - tooltipRect.width / 2 + targetRect.width / 2)
        }
        break
      case 'left':
        this.top = (targetRect.top + targetRect.height / 2 - tooltipRect.height / 2)
        this.left = (targetRect.left - tooltipRect.width)
        break
      case 'right':
        this.top = (targetRect.top + targetRect.height / 2 - tooltipRect.height / 2)
        this.left = (targetRect.left + targetRect.width)
        break
      case 'bottom':
        this.top = (targetRect.top + targetRect.height)
        this.left = (targetRect.left - tooltipRect.width / 2 + targetRect.width / 2)
        break
      default:
        console.log('Wrong tooltip placement prop')
    }
  }, 1)
}

export default updatePosition
