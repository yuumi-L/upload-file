import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

axios.post('./').then(res => {
  console.log(res)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
