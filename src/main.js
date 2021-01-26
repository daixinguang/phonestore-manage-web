import Vue from 'vue'
import App from './App.vue'
import router from './router'
import qs from 'qs'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = 'http://api.phonestore.com/api/'
// axios请求拦截器
// axios.interceptors.request.use(config => {
//   // 为请求头加上 Token 验证的 Authorization 字段
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
