<template>
  <Modal
    :class="modalClasses"
    :opened.sync="isModalOpened"
    :scroll="{body: 'modal-opened'}"
  >
    <component
      v-if="isModalOpened"
      :is="currentModalComponent"
      :modal-payload="modalPayload"
      :modal-classes.sync="modalClasses"
      @changeModal="setCurrentModalComponent"
      @close="setOpened(false)"
    />
  </Modal>
</template>
<script>
import Modal from '../'
export default {
  name: 'ModalBroker',
  components: {
    Modal
  },
  props: {
    modalOpened: {
      type: Boolean,
      default: false
    },
    modals: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentModalComponentName: null,
      isModalOpened: false,
      modalPayload: null,
      modalClasses: null
    }
  },
  computed: {
    currentModalComponent () {
      const currentModalData = this.modals.filter(item => {
        return item.componentName === this.currentModalComponentName
      })[0] || {}
      return currentModalData.component || null
    }
  },
  watch: {
    modalOpened (val) {
      this.isModalOpened = val
    },

    isModalOpened (val) {
      if (val === this.modalOpened) return
      this.$emit('update:modalOpened', val)
    }
  },
  methods: {
    setCurrentModalComponent (componentName, payload = null) {
      this.modalClasses = null
      this.modalPayload = payload
      this.currentModalComponentName = componentName
    },

    setOpened (value) {
      this.isModalOpened = value
    },

    open (componentName, payload) {
      this.setCurrentModalComponent(componentName, payload)
      this.setOpened(true)
    },

    close () {
      this.setCurrentModalComponent(null)
      this.setOpened(false)
    }
  }
}
</script>
