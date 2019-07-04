<template lang="pug">
.navbarcontainer
  nav.navbar.is-light(role='navigation' aria-label='main navigation')
    .navbar-brand
      //a.navbar-item(href='https://example.org')
        //img(src='https://bulma.io/images/bulma-logo.png', width='112', height='28')
      a.navbar-item
        strong LIPAR S.A.
      a.navbar-burger.burger(role='button', aria-label='menu', aria-expanded='false', data-target='navbarBasicExample' @click='toggleBurger' :class="burgerActive ? 'is-active' : ''")
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')
    #navbarBasicExample.navbar-menu(:class="burgerActive ? 'is-active' : ''")
      .navbar-start
        router-link(to="/").navbar-item
          | Inicio
        router-link(to="/vendedores").navbar-item
          | Vendedores
        router-link(to="/cobradores").navbar-item
          | Cobradores
        router-link(to="/clientes").navbar-item
          | Clientes
        router-link(to="/about").navbar-item
          | Acerca de
      .navbar-end
        .navbar-item
          .buttons
            a.button.is-light(v-if='!user')
              | Iniciar sesión
            a.button.is-danger(v-if='user' @click='logout')
              | Salir

</template>

<script>
//import firebase from 'firebase/app';
//import 'firebase/auth';

export default {
  name: 'navbar',
//  created: function() {
//    firebase.auth().onAuthStateChanged(user => {
//      this.user = user
//    })
//  },
  data () {
    return {
      user: null,
      burgerActive: false
    }
  },
  methods: {
//    logout () {
//      firebase.auth().signOut()
//      this.$router.push({name: 'login'})
//    },
    toggleBurger () {
      this.burgerActive = !this.burgerActive
    }
  }
}

</script>
