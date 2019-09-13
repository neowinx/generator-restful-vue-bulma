<template lang="pug">
.navbarcontainer
  nav.navbar.is-light(role='navigation' aria-label='main navigation')
    .navbar-brand
      //a.navbar-item(href='https://example.org')
        //img(src='https://bulma.io/images/bulma-logo.png', width='112', height='28')
      a.navbar-item
        strong Lipar
      a.navbar-burger.burger(role='button', aria-label='menu', aria-expanded='false', data-target='navbarBasicExample' @click='toggleBurger' :class="burgerActive ? 'is-active' : ''")
        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')
    #navbarBasicExample.navbar-menu(:class="burgerActive ? 'is-active' : ''")
      .navbar-start
        router-link(to="/").navbar-item
          | Inicio
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-item Mantenimiento
          .navbar-dropdown
            router-link(to="/vendedor").navbar-item
              | Vendedor
            router-link(to="/cobrador").navbar-item
              | Cobrador
            router-link(to="/zonas").navbar-item
              | Zonas
            router-link(to="/tipo_credito").navbar-item
              | Tipos de Crédito
            router-link(to="/rub_ing").navbar-item
              | Rubros de ingreso
            router-link(to="/rub_egr").navbar-item
              | Rubros de egreso
            router-link(to="/estado_cliente").navbar-item
              | Estados de Clientes
            router-link(to="/calendar").navbar-item
              | Calendario
            router-link(to="/cliente").navbar-item
              | Cliente
            router-link(to="/tipo_res").navbar-item
              | Tipos de Residencia
            router-link(to="/rubros_comerciales").navbar-item
              | Rubros Comerciales
            router-link(to="/novedades").navbar-item
              | Novedades
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-item Operaciones
          .navbar-dropdown
            router-link(to="/credito").navbar-item
              | Creditos
        .navbar-item.has-dropdown.is-hoverable
          a.navbar-item Seguridad
          .navbar-dropdown
            router-link(to="/usuario").navbar-item
              | Usuario
            router-link(to="/rol").navbar-item
              | Roles
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

import auth from '@/auth'

export default {
  name: 'navbar',
  created: function() {
    this.user = auth.currentUser
  },
  data () {
    return {
      user: null,
      burgerActive: false
    }
  },
  methods: {
    logout () {
      auth.logout();
      this.$router.push({name: 'login'})
    },
    toggleBurger () {
      this.burgerActive = !this.burgerActive
    }
  }
}

</script>
