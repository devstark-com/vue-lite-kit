export default {
  props: {
    rowsTotal: {
      type: Number,
      default: 0
    },
    rowsFiltered: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isPaginationAvailable () {
      return true
    },

    lastPageNumber () {
      return Math.ceil(this.rowsFiltered / this.pagination.perPage)
    },

    paginationOffset () {
      return (this.pagination.currentPage - 1) * this.pagination.perPage
    },

    rowFrom () {
      return this.paginationOffset + 1
    },

    rowTo () {
      let to = this.paginationOffset + this.pagination.perPage
      return this.rowsFiltered >= to ? to : this.rowsFiltered
    },

    perPageOptions () {
      return this._options.pagination.options.map((value) => {
        return {
          label: value.toString(),
          value: value
        }
      })
    },

    perPage: {
      get () {
        return this.pagination.perPage
      },
      set (val) {
        this.setPerPageParam(val)
      }
    },

    currentPage: {
      get () {
        return this.pagination.currentPage
      },
      set (val) {
        this.setCurrentPage(val)
      }
    }
  },
  methods: {
    setPerPageParam (val, noFetch = false) {
      this.pagination.perPage = val
      this.pagination.currentPage = 1
      this.stateUpdated(noFetch)
    },

    setCurrentPage (val, noFetch = false) {
      this.pagination.currentPage = val
      this.stateUpdated(noFetch)
    },

    resetPage (noFetch = false) {
      this.setCurrentPage(1, noFetch)
    }
  }
}
