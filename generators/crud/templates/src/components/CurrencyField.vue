<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      vue-numeric.input(currency="Gs" separator="." :value='value' @input="$emit('input', $event)" :disabled="disabled")
</template>
<script>
  import InputField from "../components/InputField";

  export default {
    name: "CurrencyField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'number'
      }
    }
  }
</script>
