<template lang="pug">
  nav.pagination(v-if='pages > 1' role='navigation' aria-label='pagination')
    ul.pagination-list(v-if='pages > 5')
      li
        a.pagination-link(@click.prevent='selected(n)') 1
      li
        span.pagination-ellipsis &hellip;
      li
        a.pagination-link(@click.prevent='selected(page - 1)') {{page - 1}}
      li
        a.pagination-link.is-current {{page}}
      li
        a.pagination-link(@click.prevent='selected(page + 1)') {{page + 1}}
      li
        span.pagination-ellipsis &hellip;
      li
        a.pagination-link(@click.prevent='selected(pages)') {{pages}}
    ul.pagination-list(v-else)
      li(v-for='n in pages')
        a.pagination-link.is-current(v-if='n === page' :aria-label="`Page ${n}`" aria-current="page") {{n}}
        a.pagination-link(v-else :aria-label="`Goto page ${n}`" @click.prevent='selected(n)') {{n}}
</template>

<script>
  export default {
    name: "PaginationView",
    props:{
      pages: null,
      page: null
    },
    methods: {
      selected: function (n) {
        this.$emit('selected', n)
      }
    }
  }
</script>
