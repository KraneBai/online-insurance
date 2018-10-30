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
      this.$router.push({name: 'Tel', query: {type}})
    },
    // 登录成功选择平台
    // selectPlatform () {
    //   if (this.username === '' || this.password === '') {
    //     this.$toast({
    //       message: '请输入用户名/密码',
    //       duration: 3000
    //     })
    //     return false
    //   }
    //   this.$indicator.open()
    //   this.axios.post('/jmobile/login/index', {
    //     username: this.username,
    //     password: this.password
    //   })
    //     .then((res) => {
    //       this.$indicator.close()
    //       if (res.data.status === 1) {
    //         let uid = res.data.data.user_auth.uid
    //         this.axios.post('/jmobile/login/up_openid', {
    //           uid,
    //           openid: localStorage.getItem('openId')
    //         })
    //           .then((res) => {
    //             if (res.data.status === 1) {
    //               localStorage.setItem('uid', uid)
    //               this.$router.replace({name: 'Platform'})
    //             } else {
    //               this.wx.closeWindow()
    //             }
    //           })
    //       } else {
    //         this.$toast({
    //           message: res.data.info,
    //           duration: 5000
    //         })
    //         this.username = ''
    //         this.password = ''
    //       }
    //     })
    //     .catch(() => {
    //       this.$indicator.close()
    //       this.username = ''
    //       this.password = ''
    //       this.$toast({
    //         message: '网络错误',
    //         duration: 5000
    //       })
    //     })
    // }
  }
}
</script>
