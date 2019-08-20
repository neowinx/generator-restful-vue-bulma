<template lang="pug">
  .confirm-dialog
    button.button(:class='[ btnCls ? btnCls : "is-primary" ]' :disabled='disabled' @click.prevent='active = true') {{ buttonTitle }}
    .modal(:class='{ "is-active": active }')
      .modal-background
      .modal-card
        header.modal-card-head
          p.modal-card-title {{ title }}
        section.modal-card-body
          p {{ message }}
        footer.modal-card-foot
          button.button(:class='[ btnCls ? btnCls : "is-primary" ]' @click.prevent='confirm') Confirmar
          button.button.is-info(@click.prevent='close') Cerrar
</template>

<script>

export default {
  data () {
    return {
      active: false,
    }
  },
  props: {
    title: null,
    buttonTitle: null,
    btnCls: null,
    message: null,
    disabled: false
  },
  methods: {
    confirm: function () {
      this.active = false
      this.$emit('confirmed')
    },
    close: function () {
      this.active = false
    }
  }
}
</script>
