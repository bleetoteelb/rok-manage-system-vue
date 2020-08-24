import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios
// Sets the default url used by all of this axios instance's requests
axios.defaults.baseURL = 'http://bleetoteelb.iptime.org/'
axios.defaults.headers.get['Accept'] = 'application/json'


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
