export default {
  methods: {
    onThClick (col) {
      if (!col.sortable) return
      this.sortBy(col)
    },

    sortBy (col) {
      if (col.field !== this.sort.field) {
        this.sort.field = col.field
        this.stateUpdated()
        return
      }
      this.toggleSortOrder()
    },

    toggleSortOrder () {
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
      this.stateUpdated()
    }
  }
}
