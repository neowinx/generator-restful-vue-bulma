<template lang="pug">
    section.section.columns.is-centered
      .column.box.is-one-quarter
          h1.title.is-2.columns.is-centered.is-offset-one-quarter <%=projectNameTitleCase%>
          p
            h2.columns.is-centered.is-offset-one-quarter Iniciar sesion
          form(@submit.prevent="login")
            .field
              .label Username
              .control
                input.input(type='input' placeholder='username' :disabled='loginIn' v-model='username' is-focused)
            .field
              .label Password
              .control
                input.input(type='password' placeholder='Password' :disabled='loginIn' v-model='password')
            p.help.is-danger(v-if='errorMessage') {{ errorMessage }}
            button.button.is-primary(:class="{'is-loading': loginIn}") Iniciar sesión
</template>
<script>
import auth from '@/auth'
import {HTTP} from '@/http'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: null,
      loginIn: false
    }
  },
  methods: {
    login () {
      this.loginIn = true
      auth.login(this.username, this.password).then(username => {
        this.$router.push({name: 'home'})
        this.username = username
      }).catch(error => {
        this.errorMessage = error.message
      }).finally(() => {
        this.loginIn = false
      })
    }
  }
}
</script>
