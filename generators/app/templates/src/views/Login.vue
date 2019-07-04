<template lang="pug">
    section.section.columns.is-centered
      .column.box.is-one-quarter
          h1.title.is-2.columns.is-centered.is-offset-one-quarter LIPAR S.A.
          p
            h2.columns.is-centered.is-offset-one-quarter Iniciar sesion
          form(@submit.prevent="login")
            .field
              .label Email
              .control
                input.input(type='email' placeholder='Email' :disabled='loginIn' v-model='email' is-focused)
            .field
              .label Password
              .control
                input.input(type='password' placeholder='Password' :disabled='loginIn' v-model='password')
            p.help.is-danger(v-if='errorMessage') {{ errorMessage }}
            button.button.is-primary(:class="{'is-loading': loginIn}") Iniciar sesión
</template>
<script>
//import firebase from 'firebase/app';
//import 'firebase/auth';

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: null,
      loginIn: false
    }
  },
  methods: {
    login () {
//      this.loginIn = true
//      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
//        this.$router.push({name: 'home'})
//      }).catch(error => {
//        this.errorMessage = error.message
//      }).finally(() => {
//        this.loginIn = false
//      })
    }
  }
}
</script>
