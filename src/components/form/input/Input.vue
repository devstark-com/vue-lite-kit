<template>
  <div class="vlk-form-control" :class="wrapperClasses">
    <slot
      name="label"
      v-if="label && labelMode === 'before'"
      :label="label"
    >
      <label class="vlk-label" :for="id">{{ label }}</label>
    </slot>
    <label class="vlk-label"
      v-if="label && labelMode === 'wrapped'"
      :for="id"
    >
      <input
        class="vlk-input"
        ref="input"
        v-if="type !== 'textarea'"
        v-bind="$attrs"
        :id="id"
        :type="type"
        :value="internalValue"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
      <textarea
        class="vlk-textarea"
        ref="textarea"
        v-else
        v-bind="$attrs"
        :id="id"
        :value="internalValue"
        :maxlength="maxlength"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
      <slot
        name="label"
        v-if="label && labelMode === 'wrapped'"
        :label="label"
      >
        <span>{{ label }}</span>
      </slot>
    </label>
    <template v-else>
      <input
        class="vlk-input"
        ref="input"
        v-if="type !== 'textarea'"
        v-bind="$attrs"
        :id="id"
        :type="type"
        :value="internalValue"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
      <textarea
        class="vlk-textarea"
        ref="textarea"
        v-else
        v-bind="$attrs"
        :id="id"
        :value="internalValue"
        :maxlength="maxlength"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      />
    </template>
    <slot
      name="label"
      v-if="label && labelMode === 'after'"
      :label="label"
    >
      <label class="vlk-label" :for="id">{{ label }}</label>
    </slot>
  </div>
</template>
<script>
import mixFormElement from '@/utils/form-element.mix.js'
export default {
  name: 'Input',
  inheritAttrs: false,
  mixins: [
    mixFormElement
  ],
  props: {
    id: {
      type: String,
      default: null
    },
    value: [Number, String],
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: null
    },
    labelMode: {
      type: String,
      default: 'before' // can be `before`, `after` or `wrapped`
    },
    wrapperClasses: {
      type: [Array, Object]
    }
  },
  data () {
    return {
      internalValue: null
    }
  },
  watch: {
    /**
     * Set internal value when v-model is changed
     */
    value (value) {
      this.internalValue = value
    },

    /**
     * Update user's v-model
     */
    internalValue (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
    onInput (event) {
      this.$nextTick(() => { this.internalValue = event.target.value })
    }
  },
  created () {
    this.internalValue = this.value
  }
}
</script>
