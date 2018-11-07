<template>
  <div class="login">
    <h1>吉林省保险从业人员服务平台</h1>
    <do-not-share></do-not-share>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import DoNotShare from '../Common/DoNotShare'
export default {
  name: 'Login',
  components: {
    DoNotShare
  },
  data () {
    return {
      appid: 'wx24ef7a62a93e7e29',
      secret: 'e907ede2d9150bc894b910c5e74c24a1'
    }
  },
  metaInfo: {
    title: '吉林省保险从业人员服务平台'
  },
  computed: {
    ...mapState(['wxnickname', 'wximage'])
  },
  created () {
    this.$indicator.close()
    // window.addEventListener('popstate', function () {
    //   history.pushState(null, null, document.URL)
    // })
    // let codeUrl = window.location.search.substr(1)
    // if (!codeUrl.indexOf('code') > -1) {
    this.getCode()
    // }
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 登录获取code
    getCode () {
      // 登录界面时先判断是否有code授权
      let codeUrl = window.location.search.substr(1)
      let code = ''
      if (codeUrl.indexOf('code') > -1) {
        code = codeUrl.split('&')[0].substr(5)
      }
      // 无code, 跳转微信授权, 重定向到此页, 即上个步骤可获取到code
      if (code === '') {
        // let redirectUri = encodeURI('http://manageservice-web.loulilouwai.com.cn')
        let redirectUri = encodeURI('https://cyrymc.iajl.org')
        // snsapi_base / snsapi_userinfo
        let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        window.location.href = url
      } else { // 有code
        this.getToken(code)
      }
    },
    getToken (code) {
      let url = 'sns/oauth2/access_token?appid=' + this.appid + '&secret=' + this.secret + '&code=' + code + '&grant_type=authorization_code'
      this.axios.get(url)
        .then((res) => {
          let openid = res.data.openid
          localStorage.setItem('tempopenid', openid)
          let accessToken = res.data.access_token
          this.getWeiXinInfo(accessToken, openid)
        })
    },
    getWeiXinInfo (accessToken, openid) {
      let url = 'sns/userinfo?access_token=' + accessToken + '&openid=' + openid + '&lang=zh_CN'
      this.axios.get(url)
        .then((res) => {
          this.changeArgs({wxnickname: res.data.nickname, wximage: res.data.headimgurl})
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  width 100%
  min-height 100%
  font-size .26rem
  color $commonTxtColor
  bg-img(100%, 100%, left, top)
  background-image url(../../assets/images/loginbg.png)
  h1
    padding-top 2.2rem
    text-align center
    font-size .44rem
    font-weight normal
.login >>>
  form
    padding 1rem .9rem 0
    box-sizing border-box
  .inp-wrapper
    padding .58rem 0 .2rem .56rem
    position relative
    line-height .4rem
    bg-img(.38rem, .38rem, left, .58rem)
    span
      display inline-block
      height .4rem
    &::before
      border-color #fff
    input
      width 100%
      border none
      background none
      color $commonTxtColor
      &::placeholder
        color $commonTxtColor
    &.username
      background-image url(../../assets/images/username.png)
    &.password
      background-image url(../../assets/images/key.png)
    &.tel
      background-image url(../../assets/images/iphone.png)
    &.verify-num
      padding-right 1.5rem
      background-image url(../../assets/images/verify.png)
      a
        position absolute
        right 0
        top .62rem
        color $commonTxtColor
        font-size 0.2rem
  .log-btns
    padding-top .9rem
    position relative
    text-align center
    .forget-pwd
      position absolute
      right 0
      top 0.3rem
      color $commonTxtColor
    input[type="submit"]
      padding 0
      width 100%
      background #758398
      height .84rem
      line-height .84rem
      color $commonTxtColor
      border-radius 25px
      font-size .32rem
      border-bottom none
    .toggle-way
      margin-top .8rem
      display inline-block
      color $commonTxtColor
      font-size .28rem
</style>
