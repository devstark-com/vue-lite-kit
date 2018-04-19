import manager from './manager.js'
import config from '@/config/'
const ATTR_NAME = config.options.tooltipContentDataAttrName

const validateBinding = (binding) => {
  if (!binding.value.uid) throw new Error('TooltipContent: undefined uid')
  return true
}

const directive = {
  bind (el, binding) {
    if (typeof window === 'undefined') return
    validateBinding(binding)
    manager.addContent(binding.value.uid, el)
    el.setAttribute(ATTR_NAME, (config.options.tooltipLinkPrefix + binding.value.uid))
  },

  inserted (el, binding) {
    el.parentNode.removeChild(el)
  },

  unbind (el, binding) {
    manager.removeContent(binding.value.uid)
  }
}

export default {
  name: 'tooltip-content',
  directive
}
