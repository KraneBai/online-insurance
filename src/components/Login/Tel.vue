<template>
  <form>
    <div class="inp-wrapper border-bottom tel">
      <input type="tel" placeholder="请输入手机号" v-model.trim="mobile">
    </div>
    <div class="inp-wrapper border-bottom verify-num">
      <input type="tel" placeholder="请输入验证码" v-model.trim="code">
      <a href="#" @click="verify" v-if="getcode" key="code">获取验证码</a>
      <a href="#" v-text="'重新发送' + countdown + 's'" v-else key="count"></a>
    </div>
    <div class="log-btns">
      <input type="submit" :value="inpTxt" @click.prevent="handleNext">
      <a class="toggle-way" @click="toggleWay">{{aTxt}}</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Tel',
  data () {
    return {
      telType: '',
      inpTxt: '登录',
      aTxt: '账号登录',
      mobile: '',
      code: '',
      getcode: true,
      countdown: 60,
      timer: null
    }
  },
  methods: {
    // 获取验证码
    verify () {
      // 判断11位手机号码且以1开头, 为数字, 且不为空
      let reg = /^1\d{10}$/
      if (!reg.test(this.mobile)) {
        this.$toast({
          message: '请输入11位手机号',
          duration: 2000
        })
        return
      }
      let sign = 0
      if (this.telType === 'forgetPwd') {
        sign = 1
      }
      this.$indicator.open()
      this.axios.post('/jmobile/login/sendsms', {
        mobile: this.mobile,
        sign
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$toast({
              message: res.data.info,
              duration: 2000
            })
            this.getcode = false
            // 开启重发验证码倒计时
            this.timer = setInterval(() => {
              this.countdown--
              if (this.countdown === 0) {
                this.getcode = true
                this.countdown = 60
                clearInterval(this.timer)
              }
            }, 1000)
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.mobile = ''
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    },
    // 切换登录方式
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 登录成功选择平台 || 下一步找回密码
    handleNext () {
      // 手机号和验证码都有值
      let mobileReg = /^1\d{10}$/
      let codeReg = /^\d{6}$/
      if (!mobileReg.test(this.mobile)) {
        this.$toast({
          message: '请输入11位手机号',
          duration: 2000
        })
        return
      }
      if (!codeReg.test(this.code)) {
        this.$toast({
          message: '请输入6位验证码',
          duration: 2000
        })
        return
      }
      let url = '/jmobile/login/index'
      let options = {login_mobile: this.mobile, code: this.code}
      // 判断是忘记密码还是手机登录
      if (this.telType === 'forgetPwd') {
        url = '/jmobile/login/retrieve'
        options = {mobile: this.mobile, code: this.code}
      }
      this.$indicator.open()
      this.axios.post(url, options)
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            if (this.telType === 'telLogin') {
              localStorage.setItem('uid', res.data.data.user_auth.uid)
              this.$router.push({name: 'Platform'})
            } else {
              this.$router.push({name: 'Reset', query: {username: res.data.data.username}})
            }
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
            this.code = ''
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.code = ''
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    }
  },
  mounted () {
    // 忘记密码 和 手机号登录
    this.telType = this.$route.query.type
    if (this.telType === 'forgetPwd') {
      this.inpTxt = '下一步'
      this.aTxt = '返回登录'
    }
  }
}
</script>
