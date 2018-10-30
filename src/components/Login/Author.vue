<template>
  <div class="author"></div>
</template>
<script>
export default {
  name: 'Author',
  created () {
    let redirectUri = encodeURI('http://manageservice-web.loulilouwai.com.cn')
    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f37f2d6536da1fd&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
    window.location.href = url
  }
}
</script>
