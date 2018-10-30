<template>
  <div class="filter-item">
    <header class="border">
      <dl>
        <dt>员工数</dt>
        <dd>{{opts.employee}}</dd>
      </dl>
      <dl class="orange">
        <dt>行业占比</dt>
        <dd>{{opts.percent}}</dd>
      </dl>
    </header>
    <div class="center border">
      <h2 v-if="opts.cates !== 'industry'" class="border-bottom">{{opts.title}}</h2>
      <div class="industry-tab" v-else>
        <span><strong>年龄：</strong>{{opts.selected.age}}</span>
        <span><strong>性别：</strong>{{opts.selected.sex}}</span>
        <span><strong>政治面貌：</strong>{{opts.selected.political}}</span>
        <span><strong>文化程度：</strong>{{opts.selected.culture}}</span>
      </div>
      <highcharts class="pie-chart" :options="pieOpt"></highcharts>
    </div>
    <footer class="border">
      <h2 class="border-bottom">{{opts.subtitle}}</h2>
      <aside>
        <h3>{{opts.category}}</h3>
        <h3>行业</h3>
        <h3>公司</h3>
        <h3>行业占比</h3>
      </aside>
      <section>
        <div class="data-list" ref="wrapper" >
          <div class="data-list-inner" ref="tabContent">
            <div ref="tabItem" class="data-item" v-for="item in opts.footerList" :key="item.stage">
              <h3>{{item.stage}}</h3>
              <span>{{item.industry}}</span>
              <span>{{item.company}}</span>
              <span>{{item.percent}}</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'DChart',
  props: {
    opts: Object
  },
  data () {
    return {
      pieOpt: {
        chart: {
          type: 'pie',
          spacing: [0, 0, 0, 0],
          backgroundColor: '#192749',
          margin: 0
        },
        colors: ['#ffc600', '#00c3ff', '#ff8400', '#6edd42', '#284dea', '#ed5a5a', '#facd89', '#009acc'],
        credits: {
          enabled: false // 版权
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: false
        },
        legend: {
          squareSymbol: false,
          symbolHeight: 2,
          symbolWidth: 6,
          verticalAlign: 'bottom',
          margin: 0,
          padding: 20,
          itemWidth: 140,
          width: 280,
          labelFormatter () {
            return '<div style="font-weight: normal; font-size: .22rem; color:' + this.color + '">' + this.name + '(' + this.y + '%)</div>'
          }
        },
        plotOptions: {
          series: {
            enableMouseTracking: false,
            size: '40%',
            center: ['50%', '30%'], // 居中
            dataLabels: {
              enabled: true,
              softConnector: false,
              distance: 20,
              style: {
                fontSize: 12,
                fontWeight: 'normal',
                textOutline: 'none' // 去除阴影
              },
              formatter () {
                return '<div style="color:' + this.color + '">' + this.y + '%</div>'
              },
              connectorPadding: 0,
              shadow: false,
              verticalAlign: 'top'
            },
            states: {
              hover: {
                enabled: false // 划过或点击效果
              }
            },
            borderWidth: 0, // 饼图边框
            showInLegend: true // 是否显示图例
          }
        },
        series: []
      }
    }
  },
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        if (this.$refs.tabItem) {
          let width = 0
          for (let i in this.$refs.tabItem) {
            width += this.$refs.tabItem[i].getBoundingClientRect().width
          }
          this.$refs.tabContent.style.width = width + 'px'
          if (!this.scrollX) {
            this.scrollX = new BScroll(this.$refs.wrapper, {
              eventPassthrough: 'vertical',
              startX: 0,
              scrollX: true,
              scrollY: false
            })
          } else {
            this.scrollX.refresh()
          }
        }
      })
    }
  },
  mounted () {
    this._initScroll()
    if (this.opts.cates === 'sex') {
      this.pieOpt.legend = Object.assign({}, this.pieOpt.legend, {itemWidth: undefined, width: undefined})
    }
    this.pieOpt.series.push(this.opts.series)
  }
}
</script>
<style lang="stylus" scoped>
.filter-item
  position relative
  box-sizing border-box
  padding 1.8rem 0 3.78rem
  color $txtColor
  height 100%
  .border
    section-border()
  .border-bottom
    &::before
      border-color $borderBottomColor
  h2
    display flex
    height 0.78rem
    line-height 0.78rem
    font-size 0.26rem
  header
    position absolute
    top 0.2rem
    left 0
    right 0
    box-sizing border-box
    display flex
    align-items center
    height 1.44rem
    dl
      position relative
      box-sizing border-box
      flex 1
      text-align center
      dt
        margin-bottom 0.15rem
        font-size 0.2rem
      dd
        font-size: 0.6rem
    .orange
      dt
        color $orangeTopColor
      dd
        color $orangeBottomColor
      &::before
        content ''
        position absolute
        top 50%
        left 0
        transform translateY(-50%)
        width 0.02rem
        height 0.6rem
        background $txtColor
  .center
    padding .88rem 0.2rem .15rem
    box-sizing border-box
    height 100%
    h2
      position absolute
      top 0
      left .2rem
      right .2rem
    .pie-chart
      width 100%
      height 100%
    .industry-tab
      position absolute
      top 0
      left 0
      right 0
      display flex
      flex-wrap wrap
      padding-top .2rem
      font-size .13rem
      z-index 9999
      span
        display inline-block
        box-sizing border-box
        padding-left .4rem
        line-height .4rem
        min-width 20%
  footer
    position absolute
    padding 0 .2rem
    bottom .2rem
    left 0
    right 0
    box-sizing border-box
    height 3.38rem
    section
      position relative
      box-sizing border-box
      padding-top .2rem
      margin-left 1.2rem
      line-height .52rem
      font-size .22rem
      overflow hidden
      .data-list
        .data-list-inner
          display flex
          flex-wrap nowrap
          .data-item
            flex 1
            text-align center
            h3
              margin-right .1rem
              min-width 1.3rem
              font-size .26rem
              white-space nowrap
            span
              margin-right .1rem
              min-width 1.3rem
              display: block
              font-size .26rem
              color: $orangeBottomColor
    aside
      position absolute
      top .98rem
      left .2rem
      text-align center
      line-height .52rem
      font-size .26rem
      width 1.2rem
      z-index 9999
</style>
