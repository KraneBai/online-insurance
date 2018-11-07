<template>
  <div class="select-platform">
    <section class="border" @click="personDetail"><i class="personnel"></i>人员分析</section>
    <section class="border" @click="business"><i class="business"></i>业务分析</section>
    <section class="border">
      <i class="online"></i>在线学习
      <form method="post" name='SendOrderForm' action='http://daxue.iachina.cn/integral/courseEntrance' accept-charset='UTF-8' onsubmit="document.charset='UTF-8'" >
        <input type="text" name="type" :value="this.eduData.type">
        <input type="text" name="sourceCode" :value="this.eduData.sourceCode">
        <input type="text" name="name" :value="this.eduData.name">
        <input type="text" name="logo" :value="this.eduData.logo">
        <input type="text" name="trueName" :value="this.eduData.trueName">
        <input type="text" name="loginName" :value="this.eduData.loginName">
        <input type="text" name="telephone" :value="this.eduData.telephone">
        <input type="text" name="email" :value="this.eduData.email">
        <input type="text" name="checkValue" :value="this.eduData.checkValue">
        <input type="submit">
      </form>
    </section>
    <section class="border" @click="personInfo"><i class="message"></i>消息通知</section>
    <do-not-share></do-not-share>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import DoNotShare from '../Common/DoNotShare'
export default {
  name: 'Platform',
  components: {
    DoNotShare
  },
  metaInfo: {
    title: '管理人员服务平台'
  },
  data () {
    return {
      eduData: {}
    }
  },
  created () {
    // window.addEventListener('popstate', function () {
    //   history.pushState(null, null, document.URL)
    // })
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 人员概览
    personDetail () {
      this.$router.push({name: 'PersonIndex'})
    },
    // 消息通知
    personInfo () {
      this.$router.push({name: 'PersonInfo'})
    },
    // 业务分析
    business () {
      this.$messagebox({
        message: '功能建设中',
        closeOnClickModal: false,
        showCancelButton: false
      })
    }
  },
  mounted () {
    // 登录页面初始化, 重置vuex数据
    let {startyear, startmonth, endyear, endmonth} = this.common.initDate()
    this.changeArgs({area: '', areaname: '', companytype: 0, startyear, startmonth, endyear, endmonth})
    // 当人员概览等页面返回到选择平台页面时, 清空上一页正在loading的效果
    this.$indicator.open()
    this.axios.get('/jmobile/index/education/uid/' + localStorage.getItem('uid'))
      .then((res) => {
        this.$indicator.close()
        if (res.data.status === 1) {
          this.eduData = Object.assign({}, this.eduData, res.data.data)
          console.log(this.eduData)
        } else {
          this.$toast({
            message: res.data.info,
            duration: 5000
          })
        }
      })
      .catch(() => {
        this.$indicator.close()
        this.$toast({
          message: '网络错误',
          duration: 5000
        })
      })
  }
}
</script>
<style lang="stylus" scoped>
.select-platform
  padding .4rem
  box-sizing border-box
  width 100%
  height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  color $commonTxtColor
  line-height .9rem
  section
    position relative
    margin-bottom .4rem
    display flex
    align-items center
    justify-content center
    height 1.7rem
    width 100%
    font-size .34rem
    section-border()
    form
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      input[type="submit"]
        position absolute
        top 0
        left 0
        opacity 0
        width 100%
        height 100%
      input[type="text"]
        visibility hidden
    i
      margin-right .46rem
      display inline-block
      width .76rem
      height .76rem
      background-size 100% 100%
      background-repeat no-repeat
      &.personnel
        background-image url(../../assets/images/personnel.png)
      &.business
        background-image url(../../assets/images/business.png)
      &.online
        background-image url(../../assets/images/online.png)
      &.message
        background-image url(../../assets/images/message.png)
</style>
