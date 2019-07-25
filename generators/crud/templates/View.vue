<%_ let collection = serviceName _%>
<template lang="pug">
.<%= serviceName %>

    include mixins.pug

    Navbar
    .section.list(v-if='!showDetail')
      .subtitle <%= changeCase.titleCase(serviceName) %>
      <%_ if(meta && meta.search) { -%>
      .level.panel
        form(@submit.prevent='searchAction').level-left
          .level-item
            <%_ if( !(meta && meta.no_list && meta.no_list.includes(meta.search)) ) { -%>
              <%_ if(meta && meta.titles && meta.titles[meta.search]) { -%>
            input.input(placeholder='<%= meta.titles[meta.search] %>' v-model='search.<%=meta.search%>')
              <%_ } else { -%>
            input.input(placeholder='<%=changeCase.titleCase(meta.search)%>' v-model='search.<%=meta.search%>')
              <%_ } -%>
            <%_ } else { -%>
            input.input(placeholder='<%=changeCase.titleCase(meta.search)%>' v-model='search.<%=meta.search%>')
            <%_ } -%>
          .level-item
            button.button.is-primary(:class="{'is-loading': searching}") Buscar
      <%_ } -%>
      progress.progress.is-small.is-primary(v-if='searching' max='100') 50

      table.table.is-bordered.is-striped.is-fullwidth.is-hoverable
        thead
          tr
        <%_ thekeys.forEach(function(e) { -%>
            <%_ if( !(meta && meta.no_list && meta.no_list.includes(e)) ) { -%>
              <%_ if(meta && meta.titles && meta.titles[e]) { -%>
            th <%= meta.titles[e] %>
              <%_ } else { -%>
            th <%= changeCase.titleCase(e) %>
              <%_ } -%>
            <%_ } -%>
        <%_ }) -%>
            th Acciones
        tbody(v-for='row in <%= collection %>List')
          tr
        <%_ thekeys.forEach(function(e) { -%>
          <%_ if( !(meta && meta.no_list && meta.no_list.includes(e)) ) { -%>
            <%_ if(typeof thejson[0][e] === 'boolean') { -%>
            td {{ row.<%= e %> ? 'Si' : 'No' }}
            <%_ } else { -%>
            td {{ row.<%= e %> }}
            <%_ } -%>
          <%_ } -%>
        <%_ }) -%>
            td.has-text-centered
              button.button.is-primary(@click.prevent='verDatos(row)') Datos

    .section.detail(v-else @keyup.esc='showDetail = false')
      h1.title Detalles de <%= serviceName %>
        form.form
        <%_ thekeys.forEach(function(e, index) { -%>
          <%_ if(index == 0) { -%>
          .columns
          <%_ } -%>
          <%_ if(index > 0 && index % 2 == 0) { -%>
          .columns
          <%_ } -%>
          <%_ var fieldTitle = meta && meta.titles && meta.titles[e] ? meta.titles[e] : changeCase.titleCase(e) -%>
          <%_ if(typeof thejson[0][e] === 'boolean') { -%>
            +checkboxField('<%= fieldTitle %>', '<%= collection %>Instance.<%=e%>')
          <%_ } else { -%>
            +textField('<%= fieldTitle %>', '<%= collection %>Instance.<%=e%>'<%_ if(index == 0) { _%>, '<%=e%>Input'<%_ } -%>)
          <%_ } -%>
        <%_ }) -%>
          button.button.is-info(@click.prevent='showDetail = false') Volver

</template>

<script>

import Navbar from '@/components/Navbar.vue'
import {HTTP} from '@/http'
import auth from '@/auth'

async function busqueda(search) {
  let response

  try {
  <%_ if(meta && meta.search) { -%>
    response = await HTTP.post('/search/<%= serviceName %>', search, {
  <%_ } -%>
    response = await HTTP.get('/<%= serviceName %>', {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
  return []
}

export default {
  data () {
    return {
      <%= collection %>List: [],
      <%= collection %>Instance: {},
      search: {
      <%_ if(meta && meta.search) { -%>
        <%= meta.search %>: null,
      <%_ } -%>
      },
      searching: false,
      showDetail: false
    }
  },
  filters: {
    dateFmt(date) {
      if (date)
        return date.split('T')[0]
      return date
    }
  },
  components: {
    Navbar
  },
  created: function() {
    this.searching = true
    busqueda(this.search).then(list => {
      this.<%= collection %>List = list
      this.searching = false
    })
  },
  methods: {
    searchAction: function () {
      this.searching = true
      busqueda(this.search).then(list => {
        this.<%= collection %>List = list
        this.searching = false
      })
    },
    verDatos: function (instance) {
      this.<%= collection %>Instance = instance
      this.showDetail = true
      <%_ if(thekeys && thekeys.length > 0) { -%>
      this.$nextTick(() => this.$refs.<%= thekeys[0] %>Input.focus())
      <%_ } -%>
    }
  }
}
</script>
