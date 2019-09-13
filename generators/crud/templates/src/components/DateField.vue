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
    }
  }
</script>
