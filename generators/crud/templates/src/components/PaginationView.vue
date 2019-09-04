<template lang="pug">

  nav.pagination(v-if='pages > 1 && pages < 7' role='navigation' aria-label='pagination')
    ul.pagination-list
      li(v-for='n in pages')
        a.pagination-link(@click.prevent='selected(n)' :class="{'is-current': page === n}") {{n}}

  nav.pagination(v-else-if='pages >= 7' role='navigation' aria-label='pagination')
    ul.pagination-list(v-if='page - 7 < 0')
      li(v-for='n in 7')
        a.pagination-link(@click.prevent='selected(n)' :class="{'is-current': page === n}") {{n}}
      li
        span.pagination-ellipsis &hellip;
      li
        a.pagination-link(@click.prevent='selected(pages)') {{pages}}
    ul.pagination-list(v-else-if='page + 6 > pages')
      li
        a.pagination-link(@click.prevent='selected(1)') 1
      li
        span.pagination-ellipsis &hellip;
      li(v-for='n in reverseKeys(7)')
        a.pagination-link(@click.prevent='selected(pages - n)' :class="{'is-current': page === pages - n}") {{pages - n}}
    ul.pagination-list(v-else)
      li
        a.pagination-link(@click.prevent='selected(1)') 1
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
</template>

<script>
  export default {
    name: "PaginationView",
    props:{
      pages: null,
      page: null
    },
    methods: {
      reverseKeys(n) {
        return [...Array(n).keys()].slice().reverse()
      },
      selected: function (n) {
        this.$emit('selected', n)
      }
    }
  }
</script>
