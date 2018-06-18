import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'
import { withKnobs } from '@storybook/addon-knobs/vue'
import marked from 'marked'
import Table from './Table.vue'

const stories = storiesOf('Table', module)

stories.addDecorator(withKnobs)

stories.add('default usage', (
  withNotes(marked(`
~~~
<Table
  class="vlk-table"
  ref="table"
  :options="t.options"
  :cols="t.cols"
  :rows="t.rows"
>
</Table>

~~~
  `))
)(
  () => {
    return {
      components: { Table },
      data () {
        return {
          t: {
            options: {
            },
            cols: [
              {
                id: 'id',
                field: 'id',
                label: 'ID',
                sortable: true
              },
              {
                id: 'col1',
                field: 'col1',
                label: 'Colunm 1',
                sortable: true
              },
              {
                id: 'col2',
                field: 'col2',
                label: 'Column 2',
                sortable: true
              },
              {
                id: 'col3',
                field: 'col3',
                label: 'Column 3',
                sortable: true
              },
              {
                id: 'col4',
                field: 'col4',
                label: 'Column 4',
                sortable: true
              }
            ],
            rows: [
              {
                id: '#1',
                col1: 'string 1.1',
                col2: 'string 1.2',
                col3: 'string 1.3',
                col4: 'string 1.4'
              },
              {
                id: '#2',
                col1: 'string 2.1',
                col2: 'string 2.2',
                col3: 'string 2.3',
                col4: 'string 2.4'
              },
              {
                id: '#3',
                col1: 'string 3.1',
                col2: 'string 3.2',
                col3: 'string 3.3',
                col4: 'string 3.4'
              },
              {
                id: '#4',
                col1: 'string 4.1',
                col2: 'string 4.2',
                col3: 'string 4.3',
                col4: 'string 4.4'
              }
            ]
          }
        }
      },
      template: `
        <Table
          class="vlk-table"
          ref="table"
          :options="t.options"
          :cols="t.cols"
          :rows="t.rows"
        >
        </Table>
        `
    }
  }
))

