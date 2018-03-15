import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'

import Select from './Select.vue'

const stories = storiesOf('Select', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<Select :options="options" />
~~~
  `))
)(
  () => {
    return {
      components: { Select },
      data () {
        return {
          options: [
            { value: 0, label: 'Option 1' },
            { value: 1, label: 'Option 2' },
            { value: 2, label: 'Option 3' },
            { value: 3, label: 'Option 4' },
            { value: 4, label: 'Option 5' }
          ]
        }
      },
      template: `<Select :options="options" />`
    }
  }
))
