<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(v-if='disabled' :value="value" :disabled="disabled")
      v-date-picker(v-else locale="es" :value="value ? new Date(value) : null" @input="kore" :masks="{ L: 'YYYY-MM-DD' }")

</template>
<script>
  import InputField from "../components/InputField";

  export default {
    name: "DateField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'date'
      }
    },
    methods: {
      kore: function ($event) {
        let formatted = $event.toISOString().split('T')[0]
        this.$emit('input', `${formatted}`)
      }
    }
  }
</script>
