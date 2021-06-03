<template lang="pug">
  .field.column
    label.label {{ label }}
    .control
      input.input(v-if="disabled", :value="value", :disabled="disabled")
      v-date-picker(
        v-else,
        :mode="mode",
        :value="value",
        @input="$emit('input', $event)",
        :popover="popover",
        :model-config="modelConfig",
        :masks="masks"
      )
        template(v-slot="{ inputValue, inputEvents }")
          input.input(
            :value="inputValue",
            v-on="inputEvents",
            :disabled="disabled"
          )
</template>
<script>
  import InputField from "../components/InputField";

  export default {
    name: "DateField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: "date",
      },
      disabled: Boolean,
      mode: String,
    },
    methods: {
      focus() {},
    },
    computed: {
      popover() {
        return { visibility: this.disabled ? "hidden" : "hover-focus" };
      },
    },
    data() {
      return {
        masks: {
          input: "YYYY-MM-DD",
          inputDateTime: "YYYY-MM-DD HH:mm",
          inputDateTime24hr: "YYYY-MM-DD HH:mm",
        },
        modelConfig: {
          type: "string",
          mask: this.mode === "dateTime" ? "YYYY-MM-DDTHH:mm:ss" : "YYYY-MM-DD",
        },
      };
    },
  };
</script>
