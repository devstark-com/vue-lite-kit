// import Avatar from './components/avatar/'
import config from '@/config/'

// Components
import Dropdown from './components/dropdown/'
import Field from './components/form/field/'
import Input from './components/form/input/'
import Modal from './components/modal/'
import ModalBroker from './components/modal/broker/'
import Select from './components/form/select/'
import Table from './components/table/'
import Upload from './components/form/upload/'

// Directives
import tooltipDirective from './components/tooltip/tooltip-directive.js'
import tooltipContentDirective from './components/tooltip/tooltip-content-directive.js'

//
import tooltipManager from '@/components/tooltip/manager.js'

// import './main.scss'

// Components list
const components = [
  // Avatar,
  Dropdown,
  Field,
  Input,
  Modal,
  ModalBroker,
  Select,
  Table,
  Upload
]

const directives = [
  tooltipDirective,
  tooltipContentDirective
]

// Expose the components
// const exposed = components.reduce((res, item) => {
//   res[item.name] = item
//   return res
// }, {})

// Install the components
export function install (Vue, options) {
  config.options = {...config.options, ...options}

  const defaultPrefix = 'vlk'
  const prefix = !options ? defaultPrefix : options.cPref || defaultPrefix
  const prefixLc = prefix.toLowerCase()
  const prefixCc = prefixLc.charAt(0).toUpperCase() + prefixLc.slice(1)

  components.forEach(component => {
    component.name = prefixCc + component.name
    Vue.component(component.name, component)
  })

  directives.forEach(directive => {
    Vue.directive(directive.name, directive.directive)
  })

  Vue.prototype['$tooltips'] = tooltipManager
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
