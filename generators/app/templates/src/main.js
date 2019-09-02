import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueNumeric from 'vue-numeric'

Vue.config.productionTip = false

Vue.use(VueNumeric)

require("./assets/main.scss")

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
