<template lang="pug">
  .field.column
    label.label
      span(v-if="required" style="color: red; margin-right: .25em") *
      | {{ label }}
    .control
      .file.is-centered
        label.file-label
          figure.image.is-128x128
            img(:src='preview')
          input.file-input(type='file' accept="image/png, image/jpeg" multiple=false :name='label' @change='changed')
          span.file-cta
            span.file-icon
              font-awesome-icon(:icon="['fas', 'file-upload']")
            span.file-label
              | Suba un archivo

</template>
<script>
  import InputField from "../components/InputField";

  export default {
    name: "ImageUploadField",
    extends: InputField,
    computed: {
      preview () {
        if (this.value)
          return this.value.startsWith('data:image') ? this.value : 'data:image/png;base64,' + this.value
      }
    },
    props: {
      type: {
        type: String,
        default: 'image'
      }
    },
    methods: {
      changed (e) {
        let _this = this
        if (e.target.files.length > 0) {
          let f = e.target.files[0];
          let reader = new FileReader();
          reader.onload = (e2) => _this.$emit('input', e2.target.result);
          reader.readAsDataURL(f);
        }
      }
    }
  }
</script>
