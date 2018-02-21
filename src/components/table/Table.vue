<template>
  <div class="reactive-table-wrapper">
    <slot name="actions-pane" :selected="selected" :rows="rows"></slot>
    <table
      :class="{
        'horizontal-separator': _options.separator === 'horizontal',
        'vertical-separator': _options.separator === 'vertical',
        'cell-separator': _options.separator === 'cell',
        'striped-odd': _options.stripe === 'odd',
        'striped-even': _options.stripe === 'even',
        'flipped': _options.flipped,
        'responsive': _options.responsive,
        'compact': _options.gutter === 'compact',
        'loose': _options.gutter === 'loose',
        'bordered': _options.bordered,
        'highlight': _options.highlight
      }"
    >
      <thead>
        <tr>
          <th v-if="isSelectionEnabled">
            <q-checkbox
              v-if="isMultiSelect"
              v-model="isSelectedAll"
            />
          </th>
          <slot
            v-for="col in _cols"
            v-if="!col.hidden"
            :name="'th-' + col.id"
            :col="col"
            :onClick="onThClick"
          >
            <th
              :class="{
                'sortable': col.sortable,
                'sorted': col.field === sort.field,
                'asc': col.field === sort.field && sort.order === 'asc',
                'desc': col.field === sort.field && sort.order === 'desc'
              }"
              :key="col.label"
              @click="onThClick(col)"
            ><!-- :key="col.label" - doesn't look well -->
              <!-- <span class="sort-icon" v-if="col.sortable">
                <i aria-hidden="true" class="q-icon material-icons"
                  v-if="col.field !== sort.field"
                >import_export</i>
                <template v-else>
                  <i aria-hidden="true" class="q-icon material-icons"
                    v-if="sort.order === 'asc'"
                  >arrow_upward</i>
                  <i aria-hidden="true" class="q-icon material-icons"
                    v-if="sort.order === 'desc'"
                  >arrow_downward</i>
                </template>
              </span> -->
              <span v-if="col.label">{{ col.label }}</span>
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-if="isSelectionEnabled">
            <q-checkbox
              v-if="isMultiSelect"
              v-model="selection.multiple"
              :val="row.id"
            />
          </td>
          <slot
            v-for="col in _cols"
            v-if="!col.hidden"
            :name="'td-' + col.id"
            :value="getValue(col, row)"
            :col="col"
            :row="row"
          >
            <td :key="col.id">{{ getValue(col, row) }}</td>
          </slot>
        </tr>
      </tbody>
    </table>
    <!-- <slot
      v-if="isPaginationAvailable"
      name="toolbarBottom"
    >
    </slot> -->
    <!-- <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading> -->
  </div>
</template>
<script type="text/javascript">
import _ from 'lodash'
import mixSelection from './selection.mix.js'
import mixSorting from './sorting.mix.js'
import mixPagination from './pagination.mix.js'
export default {
  name: 'Table',
  mixins: [
    mixSelection,
    mixSorting,
    mixPagination
  ],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: [Array, Object],
      default () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selection: {
        single: null,
        multiple: []
      },
      sort: {
        field: null,
        order: null
      },
      pagination: {
        perPage: null,
        currentPage: 1
      },
      defaults: {
        options: {
          separator: false, // ['horizontal', 'vertical', 'cell', false]
          stripe: false, // ['odd', 'even', false]
          flipped: false, // Boolean
          responsive: false, // Boolean
          gutter: false, // ['loose', 'compact', false]
          bordered: false, // Boolean
          highlight: false, // Boolean
          rowHeight: '30px', // String, to be able to define units explicitly,
          selection: 'no', // String ['multiple', 'single']
          idField: 'id',
          initialSortField: null,
          initialSortOrder: 'asc',
          pagination: {
            perPage: 10,
            options: [5, 10, 15, 20, 30, 50, 100, 500]
          }
        },
        column: {
          label: null, // String
          field: null, // String
          sortable: false, // Boolean
          width: 'auto', // [String, null]
          thAlign: 'center', // ['left', 'center', 'right', null]
          tdAlign: 'left', // ['left', 'center', 'right', null]
          tdColSpan: false, // [Number, false]
          hidden: false // Boolean
        }
      }
    }
  },
  computed: {
    _options () {
      return {...this.defaults.options, ...this.options}
    },

    _cols () {
      return this.cols.map((col) => {
        return {...this.defaults.column, ...col}
      })
    },

    rowsIds () {
      return this.rows.map((row) => {
        return row.id
      })
    },

    state () {
      return {
        sort: this.sort,
        pagination: {
          offset: this.paginationOffset,
          limit: this.pagination.perPage
        }
      }
    }
  },
  methods: {
    updateOptions () {
      this.sort.field = this._options.initialSortField || this._options.idField
      this.sort.order = this._options.initialSortOrder
      this.pagination.perPage = this._options.pagination.perPage
    },

    getValue (col, row, dflt = null) {
      const value = _.get(row, col.field, dflt)
      if (!col.format) return value
      return col.format(col, row, value)
    },

    stateUpdated (noFetch = false) {
      this.$emit('update:state', this.state, noFetch)
    }
  },
  created () {
    this.updateOptions()
    this.$emit('update:state', this.state, false)
  }
}
</script>
