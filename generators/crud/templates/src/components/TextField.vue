<script>
  import InputField from "../components/InputField";

  export default {
    name: "TextField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'text'
      }
    }
  }
</script>
