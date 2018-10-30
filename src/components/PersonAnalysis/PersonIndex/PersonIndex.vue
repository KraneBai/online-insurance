<template>
  <div class="person-overview">
    <p-header
      @centerControl="CenterControl"
      @filterControl="FilterControl"
      :user="user"
    ></p-header>
    <div class="charts" ref="swiper">
      <div class="swiper-wrapper">
        <!-- <p-chart
          class="swiper-slide"
          :type="item"
          :key="index"
          v-for="(item, index) of charts"
        ></p-chart> -->
        <p-chart
          class="swiper-slide"
          :type="all"
          v-if="all.type"
        ></p-chart>
        <p-chart
          class="swiper-slide"
          :type="add"
          v-if="add.type"
        ></p-chart>
        <p-chart
          class="swiper-slide"
          :type="leave"
          v-if="leave.type"
        ></p-chart>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <Drawer :closable="false" v-model="centerShow" placement="left">
      <p-center :user="user"></p-center>
    </Drawer>
    <Drawer :closable="false" v-model="filterShow">
      <p-filter :showDate="filterShow"></p-filter>
    </Drawer>
    <do-not-share></do-not-share>
  </div>
</template>
<script>
import PHeader from './PHeader'
import PCenter from './PCenter'
import PFilter from './PFilter'
import PChart from './PChart'
import Swiper from 'swiper'
import DoNotShare from '../../Common/DoNotShare'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PersonOverview',
  metaInfo: {
    title: '管理人员服务平台'
  },
  components: {
    PHeader,
    PCenter,
    PFilter,
    PChart,
    DoNotShare
  },
  data () {
    return {
      user: {},
      sign: 3, // 依次加载all add leave
      all: {},
      add: {},
      leave: {},
      // charts: {}, // 中心图表部分
      centerShow: false,
      filterShow: false
    }
  },
  computed: {
    ...mapState(['area', 'areaname', 'companytype', 'startmonth', 'startyear', 'endyear', 'endmonth'])
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 父级显示人物中心栏
    CenterControl (type) {
      this.centerShow = type
    },
    // 父级显示筛选栏
    FilterControl (type) {
      this.filterShow = type
    },
    setData () {
      // 获取center及header信息
      this.axios.get('/jmobile/User/index/uid/' + localStorage.getItem('uid'))
      // axios.get('/api/overviews.json')
        .then((res) => {
          if (res.data.status === 1) {
            this.user = res.data.data
            if (this.areaname === '') {
              // 存放后台返回来的地区名字
              this.changeArgs({areaname: res.data.data.city})
            }
            if (this.area === '') {
              this.changeArgs({area: res.data.data.data_level})
            }
            this._initChart()
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
    },
    _initChart () {
      if (this.sign === 3) {
        this.$indicator.open()
      }
      // 拼接日期参数
      let datestart = this.startyear + '-' + this.startmonth
      let dateend = this.endyear + '-' + this.endmonth
      let args = this.common.checkArgs({area: this.area, d_company_type: this.companytype, datestart, dateend, sign: this.sign})
      this.axios.get('/jmobile/index/index' + args)
      // axios.get('/api/charts.json')
        .then((res) => {
          if (res.data.status === 1) {
            this.$indicator.close()
            // this.charts = res.data.data
            if (this.sign === 3) {
              this.all = res.data.data.all
              this.sign = 1
              this._initChart()
            } else if (this.sign === 1) {
              this.add = res.data.data.add
              this.sign = 2
              this._initChart()
            } else if (this.sign === 2) {
              this.leave = res.data.data.leave
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
    },
    // 初始化swiper
    _swiper () {
      this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: false,
          direction: 'vertical',
          observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          noSwipingSelector: '.chart-box', // 避免局部滑动的时候 滑动slider
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  mounted () {
    this._swiper()
    this.setData()
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .ivu-drawer-content
    background-color transparent
  .ivu-drawer-no-header .ivu-drawer-body
    padding 0
    background linear-gradient(to bottom, #182649, #1d5174)
    color $txtColor
  .ivu-drawer
    width 75% !important
  .ivu-drawer-mask
    background-color rgba(0 , 0, 0,.5)
  .swiper-container-vertical > .swiper-pagination-bullets
    left .07rem
  .swiper-pagination-bullet
    width 6px
    height 6px
    display block
    margin-top .07rem
    background #3a9ec6
  .swiper-pagination-bullet-active
    height 10px
    border-radius 10px
    background #00c3ff
.person-overview
  position relative
  box-sizing border-box
  padding .2rem .3rem .3rem
  page-style()
  .charts
    position absolute
    top 3.56rem
    left 0
    bottom 0
    overflow hidden
    width 100%
    .swiper-wrapper
      padding 0 .3rem
      box-sizing border-box
</style>
