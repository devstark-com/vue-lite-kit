const tooltips = new Map()
const contents = new Map()
const manager = {
  tooltips,
  contents,

  hasTooltip (uid) {
    return this.tooltips.has(uid)
  },

  addTooltip (uid, instance) {
    if (this.hasTooltip(uid)) throw new Error('Tooltip: can\'t add, uid already exists')
    return this.tooltips.set(uid, instance)
  },

  removeTooltip (uid) {
    if (!this.hasTooltip(uid)) throw new Error('Tooltip: can\'t remove, uid doesn\'t exist')
    return this.tooltips.delete(uid)
  },

  getTooltip (uid) {
    if (!this.hasTooltip(uid)) throw new Error('Tooltip: can\'t get, uid doesn\'t exist')
    return this.tooltips.get(uid)
  },

  hasContent (uid) {
    return this.contents.has(uid)
  },

  addContent (uid, domNode) {
    if (this.hasContent(uid)) throw new Error('TooltipContent: can\'t add, uid already exists')
    return this.contents.set(uid, domNode)
  },

  getContent (uid, throwError = true) {
    if (!this.hasContent(uid) && throwError) throw new Error('TooltipContent: can\'t get, uid doesn\'t exist')
    return this.contents.get(uid)
  },

  removeContent (uid) {
    if (!this.hasContent(uid)) throw new Error('TooltipContent: can\'t remove, uid doesn\'t exist')
    return this.contents.delete(uid)
  },

  close (uid = null) {
    if (uid) {
      const instance = this.getTooltip(uid, false)
      instance.state.hide()
      return this
    }

    for (const instance of this.tooltips.values()) {
      instance.state.hide()
    }
  }
}

export default manager
