<template>
  <form>
    <div class="inp-wrapper border-bottom tel">
      <input type="tel" placeholder="请输入手机号" v-model="mobile">
    </div>
    <div class="inp-wrapper border-bottom verify-num">
      <input type="number" placeholder="请输入验证码" key="verify" v-model="code">
      <a href="#" @click="verify" v-if="getcode" key="code">获取验证码</a>
      <a href="#" v-text="'重新发送' + countdown + 's'" v-else key="count"></a>
    </div>
    <div class="log-btns">
      <input type="submit" value="下一步" @click.prevent="reset">
      <a class="toggle-way" @click="toggleWay">返回登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Forget',
  data () {
    return {
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
      this.$indicator.open()
      this.axios.post('/jmobile/login/sendsms', {
        mobile: this.mobile,
        sign: 1
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$toast({
              message: res.data.info,
              duration: 3000
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
    // 返回账号登录
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 跳转到重置密码
    reset () {
      this.$indicator.open()
      this.axios.post('/jmobile/login/retrieve', {
        mobile: this.mobile,
        code: this.code
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$router.push({name: 'Reset', query: {username: res.data.data.username}})
          } else {
            this.$toast({
              message: res.data.info,
              duration: 3000
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
  }
}
</script>
