<template>
  <div class="welcome">
  </div>
</template>
<script>
import DoNotShare from '../Common/DoNotShare'
export default {
  name: 'Welcome',
  components: {
    DoNotShare
  },
  created () {
    // 验证是否有openid, 当前微信是否登录过账号
    // 有openid即判断微信是否已经绑定过账号, 绑定过即返回uid, 跳转到选择功能页面
    // 有openid但没绑定过账号的话, 跳转到登录页面去登录
    let openid = localStorage.getItem('openid')
    if (openid) {
      this.axios.post('/jmobile/login/openid', {
        openid
      })
        .then((res) => {
          if (res.data.status === 1) {
            localStorage.setItem('uid', res.data.data.user_auth.uid)
            this.$router.replace({name: 'Platform'})
          } else {
            this.$router.replace({name: 'Login'})
          }
        })
    } else {
      // 没有openid即代表没登录过账号或者已经解绑
      this.$router.replace({name: 'Login'})
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
