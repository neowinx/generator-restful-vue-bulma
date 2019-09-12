<template lang="pug">
  .field.column
    label.label {{ inputLabel }}
    .control
      multiselect(
        :value="value"
        v-on:input="selected"
        :options="realOptions"
        :multiple="multiple"
        :close-on-select="!multiple"
        :allow-empty="multiple"
        :searchable='multiple'
        :show-labels="multiple"
        :label='label'
        :track-by='trackBy'
        placeholder="Seleccione un valor")
</template>

<script>
  import {HTTP} from "../http";
  import Multiselect from 'vue-multiselect'

  export default {
    name: "SelectField",
    props: {
      inputLabel: String,
      label: String,
      trackBy: String,
      path: String,
      value: null,
      multiple: {
        type: Boolean,
        default: false
      },
      options: Array
    },
    data: function () {
      return {
        searching: false,
        "realOptions": []
      }
    },
    components: {
      Multiselect
    },
    mounted: async function () {
      if (this.path) {
        this.searching = true
        try {
          this.realOptions = (await HTTP.get(this.path, {
            params: {
              pagination: false
            }
          })).data
        } catch (error) {
          console.log(error)
          this.realOptions = []
        } finally {
          this.searching = false
        }
      } else if (this.options && this.options.length > 0) {
        this.realOptions = this.options
      }
    },
    methods: {
      selected(newvalue) {
        this.$emit('input', newvalue)
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
