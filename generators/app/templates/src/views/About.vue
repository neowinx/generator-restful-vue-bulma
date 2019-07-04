<template lang="pug">
.about
  Navbar
  section.hero.is-medium.is-dark.is-bold
    .hero-body
      .container
        h1.title
          | LIPAR S.A.
        h2.subtitle
          | Sistema de Control de Créditos
        p Codelab S.A. - 2019
        a(href='http://codelab.com.py') codelab.com.py
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
}
</script>
