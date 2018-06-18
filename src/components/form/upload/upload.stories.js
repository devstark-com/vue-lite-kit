import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'

import Upload from './Upload.vue'

const stories = storiesOf('Upload', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<Upload> <button class="button">Click to Upload a file</button> </Upload>
~~~
  `))
)(
  () => {
    return {
      components: { Upload },
      data () {
        return {
        }
      },
      template: `<Upload> <button class="button">Click to Upload a file</button> </Upload>`
    }
  }
))
