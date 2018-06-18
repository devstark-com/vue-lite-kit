import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'

import Input from './Input.vue'

const stories = storiesOf('Input', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<Input type="text" label="Label" labelMode="after" value="value" />
~~~
  `))
)(
  () => {
    return {
      components: { Input },
      data () {
        return {
        }
      },
      template: `<Input type="text" label="Label" labelMode="after" value="value" />`
    }
  }
))
