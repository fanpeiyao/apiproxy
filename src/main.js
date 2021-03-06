import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

/* import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios */

import '@/icons' // icon
import '@/permission' // permission control
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/styles/index.css' // global css

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
