<template>
  <div class="person-header">
    <header class="border">
      <span @click="centerShow">
        <!-- <img src="../../../assets/images/avatar.png" @click="centerShow"> -->
        <img :src="this.wximage">
      </span>
      <dl>
        <dt>{{user.nickname}}</dt>
        <dd>{{user.company}}</dd>
      </dl>
      <i class="alert" @click="messageList" v-if="user.read_at === 0"></i>
      <i class="messages" @click="messageList"></i>
    </header>
    <nav class="border">
      <dl>
        <dt>{{startyear}}-{{startmonth}}至{{endyear}}-{{endmonth}} | {{companyName}}</dt>
        <dd>{{areaname}}</dd>
      </dl>
      <i @click="filterShow">筛选</i>
    </nav>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PHeader',
  props: {
    user: Object
  },
  computed: {
    ...mapState(['startmonth', 'startyear', 'endmonth', 'endyear', 'areaname', 'companytype', 'wximage']),
    companyName () {
      let type = this.companytype
      switch (type) {
        case 1:
          return '寿险类型'
        case 2:
          return '财险类型'
        case 3:
          return '中介类型'
        default:
          return '行业'
      }
    }
  },
  methods: {
    // 消息列表
    messageList () {
      this.$router.push({name: 'PersonInfo'})
    },
    // 传递给父级, 显示左边栏
    centerShow () {
      this.$emit('centerControl', true)
    },
    filterShow () {
      this.$emit('filterControl', true)
    }
  }
}
</script>
<style lang="stylus" scoped>
.person-header
  header
    position relative
    display flex
    padding 0 .3rem
    align-items center
    section-border()
    height 1.7rem
    font-size .28rem
    line-height .56rem
    span
      position relative
      z-index 99
      margin-right .26rem
      width .94rem
      min-height .94rem
      img
        width 100%
    dl
      flex 1
      dd
        line-height .38rem
        font-size .22rem
        color $commonTxtColor
    i.messages
      position absolute
      right .3rem
      top .32rem
      width .33rem
      height .33rem
      bg-img(100%, 100%, left, top)
      background-image url(../../../assets/images/news.png)
    i.alert
      position absolute
      right .24rem
      top .32rem
      width .14rem
      height .14rem
      z-index 99
      bg-img(100%, 100%, left, top)
      background-image url(../../../assets/images/point.png)
  nav
    margin .23rem 0
    display flex
    padding 0 .2rem
    align-items center
    height 1.2rem
    line-height .5rem
    section-border()
    dl
      flex 1
    i
      z-index 99
      padding-left .35rem
      bg-img(.23rem, .2rem, left, center)
      background-image url(../../../assets/images/filter.png)
</style>
