<script>
  import InputField from "../components/InputField";

  export default {
    name: "NumberField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'number'
      }
    }
  }
</script>
