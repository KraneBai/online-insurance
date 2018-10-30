// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import Meta from 'vue-meta'
import MintUI from 'mint-ui'
import VueHighcharts from 'vue-highcharts'
import { Drawer } from 'iview'

import common from './util/common.js' // 添加公用方法

import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css'
import 'styles/reset.css'
import 'styles/border.css'

Vue.use(VueHighcharts)
Vue.use(MintUI)
Vue.use(Meta)
Vue.component('Drawer', Drawer)
Vue.config.productionTip = false
Vue.prototype.common = common
Vue.prototype.axios = axios
Vue.prototype.wx = wx

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   console.log(document.URL.match(/\?.*#/))
//   // URL解析 微回调地址中code存在 ?....# 中
//   if (document.URL.match(/\?.*#/)) {
//     let temp = document.URL.match(/\?.*#/)[0]
//     if (temp.match(/=.*&/)) {
//       // 解析Code
//       let code = temp.match(/=.*&/)[0]
//       code = code.substr(1, code.length) // 去掉 ?
//       code = code.substr(0, code.length - 1) // 去掉 #
//       // 重置URL(去掉code参数，避免重复调用)
//       window.history.pushState({}, 0, document.URL.replace(temp.substr(0, temp.length - 1), ''))
//       // 通过Code请求获取openId或者用户信息(这里axios是被我封装过的)
//       // axios.post('/wxLogin/callBack', { code: code}, (data) => {
//       //   if (data.openId && data.openId !== null) {
//       //     localStorage.setItem('openId', data.openId)
//       //   }
//       // })
//     }
//   }
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
