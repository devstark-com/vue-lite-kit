import Field from './components/form/field/'
import Input from './components/form/input/'
import Table from './components/table/'

// Expose the components
const components = [
  Field,
  Input,
  Table
]

// Install the components
export function install (Vue, options) {
  const defaultPrefix = 'vlk'
  const prefix = !options ? defaultPrefix : options.cPref || defaultPrefix
  const prefixLc = prefix.toLowerCase()
  const prefixCc = prefixLc.charAt(0).toUpperCase() + prefixLc.slice(1)
  components.forEach(component => {
    component.name = prefixCc + component.name
    Vue.component(component.name, component)
  })
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
