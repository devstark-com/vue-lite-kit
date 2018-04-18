import Tooltip from './tooltip.js'
import manager from './manager.js'

const validateBinding = (binding) => {
  if (!binding.value.uid) throw new Error('Tooltip: undefined uid')
  return true
}

const createTooltipInstance = (el, binding) => {
  if (manager.hasTooltip(binding.value.uid)) throw new Error('Tooltip: instance duplication')
  const instance = Tooltip()
  return instance.init(el, binding)
}

const directive = {
  bind (el, binding) {
    if (typeof window === 'undefined') return
    validateBinding(binding)
    const instance = createTooltipInstance(el, binding)
    manager.addTooltip(binding.value.uid, instance)
  },

  inserted (el, binding) {
    if (typeof window === 'undefined') return
    validateBinding(binding)
    const instance = manager.getTooltip(binding.value.uid)
    instance.inserted()
  },

  update (el, binding) {
    if (typeof window === 'undefined') return
    validateBinding(binding)
    const instance = manager.getTooltip(binding.value.uid)
    if (!binding.value) return instance.destroy()

    const newValueAsString = JSON.stringify(binding.value)
    const oldValueAsString = JSON.stringify(binding.oldValue)
    if (!binding.oldValue || newValueAsString === oldValueAsString) return

    instance.update(binding)
  },

  unbind (el, binding) {
    if (typeof window === 'undefined') return
    validateBinding(binding)
    const instance = manager.getTooltip(binding.value.uid)
    instance.destroy()
    manager.removeTooltip(binding.value.uid)
  }
}

export default {
  name: 'tooltip', // @todo make configurable
  directive
}
