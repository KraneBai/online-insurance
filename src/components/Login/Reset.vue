<template>
  <form>
    <div class="inp-wrapper border-bottom username">
      <span>{{username}}</span>
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请输入新密码" v-model="password">
    </div>
    <div class="inp-wrapper border-bottom password">
      <input type="password" placeholder="请确认新密码" v-model="rpassword">
    </div>
    <div class="log-btns">
      <input type="submit" value="确认" @click.prevent="confirm">
      <a class="toggle-way" @click="toggleWay">返回登录</a>
    </div>
  </form>
</template>
<script>
export default {
  name: 'Reset',
  data () {
    return {
      username: '',
      password: '',
      rpassword: ''
    }
  },
  methods: {
    // 返回账号登录
    toggleWay () {
      this.$router.push({name: 'Account'})
    },
    // 密码修改确认
    confirm () {
      this.$indicator.open()
      this.axios.post('/jmobile/login/u_retrieve', {
        username: this.username,
        password: this.password,
        r_password: this.rpassword
      })
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            this.$toast({
              message: res.data.info,
              duration: 3000
            })
            this.$router.push({name: 'Account'})
          } else {
            this.$toast({
              message: res.data.info,
              duration: 3000
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
    }
  },
  mounted () {
    this.username = this.$route.query.username
  }
}
</script>
