<template>
  <div>
    <header class="border-bottom">
      <!-- <span><img src="../../../assets/images/avatar.png"></span> -->
      <span><img :src="this.wximage"></span>
      {{user.nickname}}
    </header>
    <section class="info">
      <dl>
        <dt>所属公司</dt>
        <dd>{{user.company}}</dd>
      </dl>
      <dl>
        <dt>手机号</dt>
        <dd>{{user.tel}}</dd>
      </dl>
      <dl>
        <dt>职务</dt>
        <dd>{{user.job}}</dd>
      </dl>
      <dl>
        <dt>分管工作</dt>
        <dd>{{user.division_work}}</dd>
      </dl>
      <dl>
        <dt>绑定微信</dt>
        <dd>
          {{this.wxnickname}}
          <button @click.stop="unlock">解除绑定</button>
        </dd>
      </dl>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PCenter',
  props: {
    user: Object
  },
  computed: {
    ...mapState(['wxnickname', 'wximage'])
  },
  methods: {
    // 点击空白隐藏左边栏
    centerHide () {
      this.$emit('centerControl', false)
    },
    // 解除绑定
    unlock () {
      this.axios.post('/jmobile/login/del_openid', {
        uid: localStorage.getItem('uid')
      })
        .then((res) => {
          if (res.data.status === 1) {
            localStorage.setItem('uid', '')
            localStorage.setItem('openId', '')
            window.location.href = 'http://manageservice-web.loulilouwai.com.cn'
          } else {
            this.wx.closeWindow()
          }
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
header
  height 1.52rem
  line-height 1.52rem
  font-size .3rem
  &::before
    border-color $borderBottomColor
  span
    display inline-block
    margin 0 .26rem 0 .3rem
    width .94rem
    img
      width 100%
.info
  padding .2rem 0
  font-size .26rem
  dl
    padding 0 .2rem 0 .3rem
    margin-bottom .15rem
    display flex
    line-height .48rem
    dt
      margin-right .1rem
      width 1.3rem
      color $commonTxtColor
    dd
      flex 1
      button
        margin-left .25rem
        padding 0 .2rem
        height .46rem
        line-height .46rem
        color #1a2359
        background #ffea00
        border-radius 15px
    &:last-child
      padding-right 0
</style>
