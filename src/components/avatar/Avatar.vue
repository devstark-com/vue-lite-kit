<template>
  <div>
    <img :src="src" style="position: absolute; left: -9999px; top: -9999px;" v-if="!noSrcTestImg" @error="onSrcLoadFailed" @load="srcLoaded = true" />
    <!-- <img :src="cpGravatarUrl" style="position: absolute; left: -9999px; top: -9999px;" v-if="!noGravatarTestImg" @error="onGravatarLoadFailed" @load="onGravatarLoad" /> -->
    <vue-avatar
      @error.native="onError"
      :username="username"
      :initials="initials"
      :src="cpGracefulSrc"
      :background-color="backgroundColor"
      :color="color"
      :lighten="lighten"
      :size="size"
      :rounded="rounded"
    ></vue-avatar>
  </div>
</template>
<script>
import md5 from 'md5'
import Avatar from 'vue-avatar'
export default {
  name: 'Avatar',
  components: {
    'vue-avatar': Avatar.Avatar
  },
  props: {
    email: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    initials: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    size: {
      type: Number,
      default: 50
    },
    src: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    lighten: {
      type: Number,
      default: 80
    }
  },
  created () {
    this.checkGravatar()
  },
  data () {
    return {
      srcLoaded: null,
      gravatarLoaded: null,
      gravaratSrc: null,
      gravatarDefaultImage: {
        imageKey: 'blank',
        base64: {
          '24': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAANUlEQVRIS+3SsQkAAAwCQd1/aUf4yu5TS4TD5nw9/48FKCyRRCiAAVckEQpgwBVJhAIYuK9oesQAGQOvmYAAAAAASUVORK5CYII=',
          '50': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAkElEQVRoQ+2SwQkAMAyEkv2X7g6CUIL9nxDtzpG3R+6YDvmtZEUqIhnoa0liMbYiWJ00rIgkFmMrgtVJw4pIYjG2IlidNKyIJBZjK4LVScOKSGIxtiJYnTSsiCQWYyuC1UnDikhiMbYiWJ00rIgkFmMrgtVJw4pIYjG2IlidNKyIJBZjK4LVScOKSGIx9kyRBxCRADOd5J92AAAAAElFTkSuQmCC'
        }
      }
    }
  },
  computed: {
    cpGracefulSrc () {
      switch (true) {
        case this.srcLoaded === true:
          return this.src
        case this.gravatarLoaded === true:
          return this.cpGravatarUrl
        default: return undefined
      }
    },
    cpGravatarUrl () {
      return !this.email ? null : '//www.gravatar.com/avatar/' + md5(this.email.trim().toLowerCase()) + '?s=' + this.size + '&d=' + this.gravatarDefaultImage.imageKey + '&r=g'
    },
    noSrcTestImg () {
      return !this.src || this.srcLoaded === false
    },
    noGravatarTestImg () {
      return !this.email || this.gravatarLoaded === false
    }
  },
  methods: {
    onSrcLoadFailed (e) {
      this.srcLoaded = false
    },

    toDataURL (src, callback, outputFormat) {
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        let canvas = document.createElement('CANVAS')
        let ctx = canvas.getContext('2d')
        let dataURL
        canvas.height = this.naturalHeight
        canvas.width = this.naturalWidth
        ctx.drawImage(this, 0, 0)
        dataURL = canvas.toDataURL(outputFormat)
        callback(dataURL)
      }
      img.src = src
      if (img.complete || img.complete === undefined) {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
        img.src = src
      }
    },

    checkGravatar () {
      this.toDataURL(this.cpGravatarUrl, function (dataUrl) {
        if (dataUrl === this.gravatarDefaultImage.base64[this.size]) {
          this.gravatarLoaded = false
        } else {
          this.gravatarLoaded = true
        }
      }.bind(this))
    }
  }
}
</script>
