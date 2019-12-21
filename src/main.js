import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/request'
import Components from './components/index'
import './permision'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Components)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
