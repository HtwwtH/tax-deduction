import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import App from './App.vue'
import store from './store'
import './assets/styles/index.scss'

Vue.config.productionTip = false
Vue.use(vClickOutside)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
