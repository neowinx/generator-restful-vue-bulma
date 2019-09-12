<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(:type='type' ref='txtinput' :placeholder='label' :maxlength='maxLength' :value='value' @input='changed')
</template>

<script>
  export default {
    name: "InputField",
    props: {
      label: String,
      type: String,
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
