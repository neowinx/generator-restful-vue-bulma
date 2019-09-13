<template lang="pug">
  .field.column
    .control
      label.checkbox {{ label }}
      input(type='checkbox' :checked="value" @change="$emit('input', $event.target.checked)")
</template>

<script>
  import InputField from "../components/InputField";

  export default {
    name: "CheckField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'checkbox'
      }
    }
  }
</script>
