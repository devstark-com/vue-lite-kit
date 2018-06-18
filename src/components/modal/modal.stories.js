import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'

import Modal from './Modal.vue'

const stories = storiesOf('Modal', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<div>
  <button class="button" @click="modalOpened = true">Click to open modal</button>
  <Modal :opened="modalOpened">
    <button @click="modalOpened = false">close</button>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nunc porta bibendum finibus. Proin dignissim ullamcorper tincidunt.
    Cras lobortis risus ac ligula semper scelerisque vel vitae ex.
    Praesent sit amet consectetur velit. Donec viverra volutpat nisi,
    ac porta nulla hendrerit id. </div>
  </Modal>
</div>
~~~
  `))
)(
  () => {
    return {
      components: { Modal },
      data () {
        return {
          modalOpened: false
        }
      },
      template: `
        <div>
          <button class="button" @click="modalOpened = true">Click to open modal</button>
          <Modal :opened="modalOpened">
            <button @click="modalOpened = false">X</button>
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc porta bibendum finibus. Proin dignissim ullamcorper tincidunt.
            Cras lobortis risus ac ligula semper scelerisque vel vitae ex.
            Praesent sit amet consectetur velit. Donec viverra volutpat nisi,
            ac porta nulla hendrerit id. </div>
          </Modal>
        </div>`
    }
  }
))
