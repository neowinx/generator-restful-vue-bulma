<template lang="pug">
  .field.column
    label.label
      span(v-if="required" style="color: red; margin-right: .25em") *
      | {{ label }}
    .control
      .file
        label.file-label
          input.file-input(type='file', name='resume')
          span.file-cta
            span.file-icon
              font-awesome-icon(:icon="['fas', 'file-upload']")
            span.file-label
              | Choose a file

</template>
<script>
  import InputField from "../components/InputField";

  export default {
    name: "ImageUploadField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'image'
      }
    }
  }
</script>
