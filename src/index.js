import Avatar from './components/avatar/'
import Field from './components/form/field/'
import Input from './components/form/input/'
import Select from './components/form/select/'
import Table from './components/table/'

import './main.scss'

// Components list
const components = [
  Avatar,
  Field,
  Input,
  Select,
  Table
]

// Expose the components
// const exposed = components.reduce((res, item) => {
//   res[item.name] = item
//   return res
// }, {})

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
