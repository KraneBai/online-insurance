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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
