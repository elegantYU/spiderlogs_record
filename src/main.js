import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/plugins/element.js'
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
