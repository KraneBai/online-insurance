<template>
  <div class="filter-wrapper">
    <div class="filters" ref="swiper">
      <div class="swiper-wrapper">
        <d-chart
          class="swiper-slide"
          v-for="(item, index) of allCharts"
          :key="index"
          :opts="item"
        ></d-chart>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <do-not-share></do-not-share>
  </div>
</template>
<script>
import Swiper from 'swiper'
import DChart from './DChart'
import DoNotShare from '../../Common/DoNotShare'
import { mapState } from 'vuex'
export default {
  name: 'DCharWrap',
  metaInfo: {
    title: '管理人员服务平台'
  },
  components: {
    DChart,
    DoNotShare
  },
  data () {
    return {
      allCharts: []
    }
  },
  computed: {
    ...mapState(['area', 'companytype', 'startmonth', 'startyear', 'endyear', 'endmonth'])
  },
  methods: {
    _swiper () {
      this.$nextTick(() => {
        this.swiper = new Swiper(this.$refs.swiper, {
          loop: false,
          direction: 'vertical',
          observer: true,
          noSwipingSelector: '.chart-box', // 避免局部滑动的时候 滑动slider.
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    },
    setData () {
      console.log(this.$route.query)
      this.$indicator.open()
      let datestart = this.startyear + '-' + this.startmonth
      let dateend = this.endyear + '-' + this.endmonth
      let {sex, education, political, min, max, sign} = this.$route.query
      let args = this.common.checkArgs({sign, area: this.area, d_company_type: this.companytype, datestart, dateend, sex, education, political, min, max})
      console.log(args)
      this.axios.get('/jmobile/index/details' + args)
        .then((res) => {
          this.$indicator.close()
          console.log(res)
          if (res) {
            this.allCharts = res.data.data
            // this.radio = data.data.radio
            // this.multi = data.data.multi
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
    this.setData()
    this._swiper()
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .swiper-container-vertical > .swiper-pagination-bullets
    left .07rem
  .swiper-pagination-bullet
    display block
    width 6px
    height 6px
    margin-top .07rem
    background #3a9ec6
  .swiper-pagination-bullet-active
    height 10px
    border-radius 10px
    background #00c3ff
.filter-wrapper
  position relative
  box-sizing border-box
  padding 0 .3rem 0
  page-style()
  .filters
    height 100%
    width 100%
    overflow hidden
</style>
