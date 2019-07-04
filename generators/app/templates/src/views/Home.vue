<template lang="pug">
.home
  Navbar
  section.hero.is-medium.is-primary.is-bold
    .hero-body
      .container
        h1.title Inicio
        h2.subtitle Bienvenido, seleccione una opción del menú por favor
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  data () {
    return {
      user: null
    }
  },
  components: {
    Navbar
  }
}
</script>
