import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'
import Vue from 'vue'
import Tooltip from './Tooltip.vue'
Vue.directive('tooltip', Tooltip)
Vue.directive('tooltip-content', Tooltip)

const stories = storiesOf('Tooltip', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<div><h1>Hover this to see tooltip</h1></div>
~~~
  `))
)(
  () => {
    return {
      data () {
        return {
        }
      },
      template: `
        <div>
          <h3 v-tooltip.hover="{ uid: 'tooltip_id' }">Hover this to see tooltip</h3>
          <div v-tooltip-content="{ uid: 'tooltip_id' }">
            Here is tooltip content
          </div>
        </div>
        `
    }
  }
))
