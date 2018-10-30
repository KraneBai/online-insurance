<template>
  <div class="personnel">
    <!-- 离司/人员概览/入司 -->
    <div class="chart-inner border" ref="chartbox">
      <div class="chart-inner-top">
        <h2 class="border-bottom"><span>{{type.category}}</span><i @click="toFilterChartDetail(type.type)">详细</i></h2>
        <section class="chart-top">
          <dl>
            <dt>{{type.top.left}}</dt>
            <dd>{{type.top.leftNum}}</dd>
          </dl>
          <dl class="orange">
            <dt>{{type.top.right}}</dt>
            <dd>{{type.top.rightPer}}</dd>
          </dl>
          <highcharts class="pie" :options="pieOpt"></highcharts>
        </section>
        <h3 class="border-bottom">{{type.subcategory}}</h3>
      </div>
      <div class="chart-box-wrapper" ref="chart-box-wrapper">
        <div class="chart-box">
          <highcharts :options="lineOpt"></highcharts>
        </div>
      </div>
    </div>
    <footer class="border" :ref="type.type === 'all' ? 'swiper' : ''" v-if="type.type !== 'add'">
      <div :class="{'swiper-wrapper': (type.type === 'all')}">
        <div :class="{'swiper-slide': (type.type === 'all'), 'width100': (type.type === 'leave')}" v-for="(items, sindex) of type.footerList" :key="'swipe' + sindex">
          <section ref="tabItem" v-for="(item, index) of items" :key="index">
            <dl>
              <dt>{{item.newTit}}</dt>
              <dd>{{item.newMount}}</dd>
            </dl>
            <dl class="orange">
              <dt>{{item.industryTit}}</dt>
              <dd>{{item.industryMount}}</dd>
            </dl>
          </section>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Swiper from 'swiper'
import { mapState } from 'vuex'
export default {
  name: 'PChart',
  props: {
    type: Object
  },
  computed: {
    hasFooter () {
      return this.type.type !== 'add'
    },
    ...mapState(['startmonth', 'startyear'])
  },
  data () {
    return {
      commonChart: {
        colors: ['#ffc600', '#00c3ff'],
        title: {
          text: null
        },
        tooltip: {
          enabled: false
        },
        legend: {
          squareSymbol: false,
          symbolHeight: 2,
          symbolWidth: 12,
          floating: true,
          align: 'right',
          verticalAlign: 'top',
          labelFormatter () {
            return '<div style="font-weight: normal; font-size: .18rem; color:' + this.color + '">' + this.name + '</div>'
          }
        }
      },
      lineOpt: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          marginTop: 25,
          marginRight: 15,
          height: 200
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
            marker: {
              symbol: 'circle'
            },
            enableMouseTracking: false,
            lineWidth: 1,
            dataLabels: {
              enabled: true,
              style: {
                color: this.color,
                fontWeight: 'normal',
                fontSize: '10',
                textOutline: 'none' // 文字去除阴影
              }
            }
          },
          series: {
            // 动态生成开始月份
            // pointStart: Date.UTC(2018, this.startmonth - 1, 1), // 2018-01-01开始
            pointIntervalUnit: 'month'
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%Y-%m'
          },
          // categories: ['2018-1',  '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12', '2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12'],
          labels: {
            style: {
              color: '#fff',
              fontSize: '8px'
            }
          },
          lineColor: '#2c3459',
          title: {
            text: '年月',
            style: {
              fontSize: '9',
              color: '#fff'
            },
            y: -10
          },
          tickLength: 0, // 刻度线长度
          tickPixelInterval: 50
        },
        yAxis: [{
          labels: {
            style: {
              fontSize: '8',
              color: '#fff' // y轴显示颜色
            }
          },
          min: 0,
          endOnTick: false, // 最顶部多出来线条
          lineColor: '#2c3459', // y轴颜色
          lineWidth: 1, // 默认0 x轴默认1
          gridLineColor: '#2c3459', // 数据线颜色
          title: {
            text: '人员数(人)',
            style: {
              fontSize: '9',
              color: '#fff'
            },
            align: 'high',
            offset: -10,
            rotation: 0,
            y: -10,
            x: 10
          },
          tickInterval: 10000, // 数据数间隔
          maxPadding: 0
        }]
      },
      pieOpt: {
        chart: {
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          margin: 0
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            size: '75%',
            states: {
              hover: {
                enabled: false // 划过或点击效果
              }
            },
            showInLegend: true, // 是否显示图例
            borderWidth: 0, // 图的边框
            dataLabels: {
              format: '{y}%',
              color: '#00c3ff',
              distance: 5,
              connectorColor: '#00c3ff',
              connectorPadding: 0, // 线和label的距离
              style: {
                fontSize: '8',
                textOutline: 'none' // 文字去除阴影
              },
              softConnector: false // 线条硬朗？
            }
          }
        }
      }
    }
  },
  methods: {
    toFilterChartDetail (type) {
      this.$router.push({name: 'DetailFilter', query: {type}})
    },
    _initChart () {
      // pie图  动态改变obj的值
      this.pieOpt = Object.assign({}, this.commonChart, this.pieOpt, this.type.pieData)
      this.pieOpt.legend = Object.assign({}, this.pieOpt.legend, {layout: 'vertical'}, {x: 5, y: -5}, {symbolWidth: 0})
      // line图
      this.lineOpt = Object.assign({}, this.commonChart, this.lineOpt, this.type.lineData)
      this.lineOpt.plotOptions.series = Object.assign({}, this.lineOpt.plotOptions.series, {pointStart: Date.UTC(this.startyear, this.startmonth - 1, 1)})
    },
    // 初始化swiper
    _swiper () {
      this.$nextTick(() => {
        if (this.$refs.swiper) {
          this.swiper = new Swiper(this.$refs.swiper, {
            direction: 'horizontal',
            loop: true,
            autoplay: {
              disableOnInteraction: false // 解决操作轮播后不autoplay
            },
            observer: true // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
          })
        }
      })
    }
  },
  mounted () {
    this._swiper()
    this._initChart()
    // 新增人员时没有底部 动态调整位置
    if (this.type.type === 'add') {
      this.$refs.chartbox.style.bottom = '.3rem'
    }
    // console.log(this.$refs['chart-box-wrapper'].clientHeight)
    // 先加载初始化图表 ， 之后设置高度
    this.lineOpt.chart = Object.assign({}, this.lineOpt.chart, {height: this.$refs['chart-box-wrapper'].clientHeight})
  }
}
</script>
<style lang="stylus" scoped>
>>>
  .highcharts-legend-item
    position relative
    padding-top .2rem
    .highcharts-point
      position absolute
      top 0
      left 0
  .swiper-slide
    &:nth-child(2n+1)
      section
        position relative
        &:nth-child(2n+1)::after
          display none
        dl
          &:first-child::after
            content ''
            position absolute
            left 50%
            top 50%
            margin-top -.3rem
            width 1px
            height .6rem
            background $txtColor
.personnel
  position relative
  height 100%
  color $txtColor
  .border
    section-border()
  .border-bottom
    &::before
      border-color $borderBottomColor
  .chart-inner
    padding 2.82rem .2rem .2rem
    position absolute
    box-sizing border-box
    top 0
    bottom 1.9rem
    left 0
    right 0
    .chart-inner-top
      position absolute
      top 0
      left .2rem
      right .2rem
      h2
        display flex
        height .78rem
        line-height .78rem
        font-size .26rem
        i
          flex 1
          padding-right .35rem
          font-size .22rem
          text-align right
          bg-img(.12rem, .22rem, right .1rem, center)
          background-image url(../../../assets/images/arrow_right.png)
      h3
        display flex
        height .58rem
        line-height .58rem
        font-size .26rem
  section
    display flex
    align-items center
    height 1.46rem
    dl
      min-width 25%
      text-align center
      dt
        margin-bottom .15rem
        font-size .2rem
      dd
        font-size .7rem
    .orange
      margin 0 .3rem
      dt
        color $orangeTopColor
      dd
        color $orangeBottomColor
    .pie
      flex 1
      margin-top .5rem
      overflow hidden
      position relative
      height 130%
  .chart-box-wrapper
    // overflow scroll
    width 100%
    height 100%
    .chart-box
      // width 30rem
      height 100%
      .legend
        margin-top .2rem
        display flex
        color $commonTxtColor
        font-size .16rem
        p
          &.legend-right
            flex: 1
            text-align right
            span
              position relative
              padding-top .2rem
              display inline-block
              height .35rem
              &::before
                content ''
                position absolute
                top 0
                left 0
                width .16rem
                height .03rem
            .first
                margin-right .1rem
                color #ffff43
                &::before
                  background #ffff43
            .last
                color #00ccff
                &::before
                  background #00ccff
  footer
    position absolute
    box-sizing border-box
    bottom .3rem
    left 0
    right 0
    overflow hidden
    white-space nowrap
    div
      display flex
      flex-wrap nowrap
      section
        position relative
        flex 1
        min-width 3rem
        height 1.4rem
        &:first-child::after
          content ''
          position absolute
          right 0
          width 1px
          height .6rem
          background $txtColor
        dl
          flex 1
          dd
            font-size .4rem
      .orange
        margin 0
    .width100
      width 100%
</style>
