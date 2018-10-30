<template>
  <div class="lists">
    <header class="border-bottom">
      <span
        :class="{active: isActive}"
        class="first"
        @click="toggleTab('messages')"
      >
        通知公告
      </span>
      <span
        :class="{active: !isActive}"
        class="second"
        @click="toggleTab('reports')"
      >
        分析报告
      </span>
    </header>
    <div class="contents">
      <mt-loadmore
        ref="loadmore"
        :autoFill="false"
        :top-method="loadTop"
        :bottom-method="loadBottom"
        @bottom-status-change="bottomStatusChange"
        :bottom-all-loaded="bottomAllLoaded"
        v-if="!noData"
      >
        <info-list :messages="lists" :type="tab"></info-list>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span class="mint-loadmore-text" v-show="bottomStatus !== 'loading'">
              <template v-if='allLoaded'>已加载全部</template>
              <template v-else>向上滑动↑加载更多</template>
          </span>
          <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
      <div class="noData" v-else>暂无数据</div>
    </div>
    <do-not-share></do-not-share>
  </div>
</template>
<script>
import InfoList from './InfoList'
import DoNotShare from '../../Common/DoNotShare'
export default {
  name: 'PersonInfo',
  components: {
    InfoList,
    DoNotShare
  },
  data () {
    return {
      bottomStatus: '',
      bottomAllLoaded: false,
      tab: 'messages',
      isActive: true,
      allLoaded: false,
      messages: [], // 存放通知公告
      reports: [], // 存放分析报告数据
      lists: [], // 实际传给列表页面的数组
      page: 1
    }
  },
  computed: {
    noData () {
      if (this.tab === 'messages' && this.messages.length === 0) {
        return false
      }
      if (this.tab === 'reports' && this.reports.length === 0) {
        return false
      }
    }
  },
  methods: {
    // 切换tab
    toggleTab (type) {
      if (this.tab === type) {
        return false
      } else {
        this.page = 1
        this.tab = type
        this.isActive = type === 'messages'
        // 判断当前切换的tab中是否之前加载过数据, 决定是否初始化数据
        if (this[type].length === 0) {
          this.setData(this.tab, 'init')
        }
        this.lists = this[type]
      }
    },
    loadTop () {
      this.setData(this.tab, 'reload')
    },
    loadBottom () {
      this.setData(this.tab, 'loadmore')
    },
    bottomStatusChange (status) {
      this.bottomStatus = status
    },
    // 上拉loadmore 下拉reload 初始化init -> 数据
    setData (tab, type) {
      this.$indicator.open()
      // let url = 'messages.json'
      let url = 'Notice/index'
      if (tab === 'reports') {
        url = 'new_notice/index'
      }
      // axios.get('/api/' + url)
      this.axios.get('/jmobile/' + url + '/uid/' + localStorage.getItem('uid') + '/page/' + this.page)
        .then((res) => {
          this.$indicator.close()
          if (res.data.status === 1) {
            if (type === 'loadmore') {
              if (tab === 'messages') {
                this.messages.push(...res.data.data)
                this.lists = this.messages
              } else {
                this.reports.push(...res.data.data)
                this.lists = this.reports
              }
              this.$refs.loadmore.onBottomLoaded()
              // this.allLoaded = true // 若数据已全部获取完毕
            } else {
              if (tab === 'messages') {
                this.messages = res.data.data
                this.lists = this.messages
              } else {
                this.reports = res.data.data
                this.lists = this.reports
              }
              if (type === 'reload') {
                this.$refs.loadmore.onTopLoaded()
              }
            }
            // 无论何种状态, 判断返回数据是否小于10条, 小于即全部加载完毕
            if (res.data.data.length < 10) {
              this.allLoaded = true
              this.bottomAllLoaded = true
            }
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
  },
  mounted () {
    this.setData(this.tab, 'init')
  }
}
</script>
<style lang="stylus" scoped>
.lists
  position relative
  width 100%
  min-height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  header
    padding .3rem 0
    text-align center
    font-size 0
    z-index 999
    &::before
      border-color $borderBottomColor
    span
      display inline-block
      box-sizing border-box
      width 1.6rem
      height .6rem
      font-size .28rem
      color $txtColor
      text-align center
      line-height .6rem
      border 1px solid $borderColor
      &.active
        color $commonTxtColor
        background #00ccff
      &.first
        border-top-left-radius $borderRadius - 5px
        border-bottom-left-radius $borderRadius - 5px
      &.second
        border-top-right-radius $borderRadius - 5px
        border-bottom-right-radius $borderRadius - 5px
  .contents
    overflow auto
    position absolute
    top 1.2rem
    left 0
    right 0
    bottom 0
    webkit-overflow-scrolling touch
  .noData
    padding-top .5rem
    text-align center
    color $commonTxtColor
  >>>
    .mint-loadmore
      padding-bottom 1rem
      min-height 100%
    .mint-loadmore-text
      color $txtColor
    .mint-spinner-snake
      margin 0 auto
</style>
