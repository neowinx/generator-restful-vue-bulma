<script>
  import InputField from "../components/InputField";

  export default {
    name: "PasswordField",
    extends: InputField,
    props: {
      type: {
        type: String,
        default: 'password'
      }
    }
  }
</script>
