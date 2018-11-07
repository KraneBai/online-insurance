import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/components/Login/Welcome' // 欢迎跳转页
import Author from '@/components/Login/Author' // 登录
import Login from '@/components/Login/Login' // 登录
import Account from '@/components/Login/Account' // 账号登录
import Tel from '@/components/Login/Tel' // 密码登录
import Reset from '@/components/Login/Reset' // 重置密码
import Platform from '@/components/Login/Platform' // 选择平台

import PersonIndex from '@/components/PersonAnalysis/PersonIndex/PersonIndex' // 人员概览

import PersonInfo from '@/components/PersonAnalysis/PersonInfo/PersonInfo' // 右上角信息列表
import InfoDetail from '@/components/PersonAnalysis/PersonInfo/InfoDetail' // 信息列表的信息详细

import DetailFilter from '@/components/PersonAnalysis/DetailFilter/DetailFilter' // 人员概览图表详细
import DCharWrap from '@/components/PersonAnalysis/DetailFilter/DCharWrap' // 详细筛选后的图表

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      redirect: '/Login/Tel',
      children: [
        {
          path: '/Login/Account',
          name: 'Account',
          component: Account
        },
        {
          path: '/Login/Tel',
          name: 'Tel',
          component: Tel
        },
        {
          path: '/Login/Reset',
          name: 'Reset',
          component: Reset
        }
      ]
    },
    {
      path: '/Author',
      name: 'Author',
      component: Author
    },
    {
      path: '/Platform',
      name: 'Platform',
      component: Platform
    },
    {
      path: '/PersonIndex',
      name: 'PersonIndex',
      component: PersonIndex
    },
    {
      path: '/PersonInfo',
      name: 'PersonInfo',
      component: PersonInfo
    },
    {
      path: '/InfoDetail/id/:id',
      name: 'InfoDetail',
      component: InfoDetail
    },
    {
      path: '/DetailFilter',
      name: 'DetailFilter',
      component: DetailFilter
    },
    {
      path: '/DCharWrap',
      name: 'DCharWrap',
      component: DCharWrap
    }
  ]
})
