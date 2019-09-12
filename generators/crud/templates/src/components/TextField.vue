<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(type='text' ref='txtinput' :placeholder='label' :maxlength='maxLength' :value='value' @input='changed')
</template>

<script>
  export default {
    name: "TextField",
    props: {
      label: String,
      maxLength: Number,
      value: null,
    },
    methods: {
      changed(newvalue) {
        this.$emit('input', newvalue)
      },
      focus() {
        this.$refs.txtinput.focus();
      }
    }
  }
</script>
