<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(type='password' ref='passinput' :placeholder='label' :value='value' @input='changed')
</template>

<script>
  export default {
    name: "PasswordField",
    props: {
      label: String,
      value: null
    },
    methods: {
      selected(newvalue) {
        this.$emit('input', newvalue)
      },
      focus() {
        this.$refs.passinput.focus();
      }
    }
  }
</script>

<style scoped>

</style>
