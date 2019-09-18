<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(:type='type' ref='txtinput' :placeholder='label' :maxlength='maxLength' :value='value' @input='changed' :disabled="disabled")
</template>

<script>
  export default {
    name: "InputField",
    props: {
      label: String,
      type: String,
      maxLength: Number,
      value: null,
      disabled: null
    },
    methods: {
      changed(event) {
        this.$emit('input', event.target.value)
      },
      focus() {
        this.$refs.txtinput.focus();
      }
    }
  }
</script>
