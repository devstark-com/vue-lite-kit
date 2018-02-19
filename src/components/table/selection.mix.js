import _ from 'lodash'

/**
 * The mixin serves the logic related to rows selection
 */
export default {
  computed: {
    /*
     */
    isSelectionEnabled () {
      return this.isSingleSelect || this.isMultiSelect
    },

    isMultiSelect () {
      return this._options.selection === 'multiple'
    },

    isSingleSelect () {
      return this._options.selection === 'single'
    },

    isSelectedAll: {
      get () {
        return this.isMultiSelect ? !_.difference(this.rowsIds, this.selection.multiple).length : false
      },
      set (val) {
        this.selectAllRows(val)
      }
    },

    selected () {
      if (!this.isSelectionEnabled) return []
      return this.isMultiSelect ? this.selection.multiple : [this.selection.single]
    }
  },
  watch: {
    selected (val) {
      this.$emit('update:selected', val)
    }
  },
  methods: {
    selectAllRows (val) {
      this.selection.multiple = val ? [...this.rowsIds] : []
    }
  }
}
