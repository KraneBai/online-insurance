<template>
  <form>
    <div class="inp-wrapper border-bottom username">
      <input type="text" placeholder="请输入账号" v-model="username">
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="log-btns">
      <input type="submit" value="登录" @click.prevent="selectPlatform">
      <a class="forget-pwd" href="#" @click="toggleWay('forgetPwd')">忘记密码?</a>
      <a class="toggle-way" @click="toggleWay('telLogin')">手机号登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Account',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 切换登录方式
    toggleWay (type) {
      this.$router.replace({name: 'Tel', query: {type}})
    },
    // 登录成功选择平台
    selectPlatform () {
      if (this.username === '' || this.password === '') {
        this.$toast({
          message: '请输入用户名/密码',
          duration: 3000
        })
        return false
      }
      this.$indicator.open()
      this.axios.post('/jmobile/login/index', {
        username: this.username,
        password: this.password
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$messagebox({
              message: '您必须将该账号与微信绑定后才能使用本系统，请点击“允许”完成绑定。点击“取消”退出本系统',
              closeOnClickModal: false,
              showCancelButton: true,
              confirmButtonText: '允许'
            }).then(action => { // confirm cancel
              if (action === 'cancel') {
                this.wx.closeWindow()
              } else {
                // let uid = res.data.data.user_auth.uid
                // localStorage.setItem('uid', uid)
                // this.$router.replace({name: 'Platform'})
                let uid = res.data.data.user_auth.uid
                let openid = localStorage.getItem('tempopenid')
                this.axios.post('/jmobile/login/up_openid', {
                  uid,
                  openid
                })
                  .then((res) => {
                    if (res.data.status === 1) {
                      localStorage.setItem('uid', uid)
                      localStorage.setItem('openid', openid)
                      this.$router.replace({name: 'Platform'})
                    } else if (res.data.status === 2) {
                      this.$messagebox({
                        message: res.data.info,
                        closeOnClickModal: false,
                        showCancelButton: false
                      })
                    } else {
                      this.$messagebox({
                        message: res.data.info,
                        closeOnClickModal: false,
                        showCancelButton: false
                      }).then(action => {
                        this.wx.closeWindow()
                      })
                    }
                  })
              }
            })
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
            this.username = ''
            this.password = ''
          }
        })
        .catch(() => {
          this.$indicator.close()
          this.username = ''
          this.password = ''
          this.$toast({
            message: '网络错误',
            duration: 5000
          })
        })
    }
  }
}
</script>
