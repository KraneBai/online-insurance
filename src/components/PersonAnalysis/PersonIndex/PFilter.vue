<template>
  <div class="filter-content">
    <div class="filter-inner" v-if="showDate">
      <date
        :radio="times"
        @getType="getFilterInfo"
        ref="timezone"
      ></date>
      <radio @getType="getFilterInfo" :radio="companies" ref="companyzone"></radio>
      <radio @getType="getFilterInfo" :radio="areas" ref="areazone"></radio>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
      <button class="search-btn" @click="search">确定</button>
    </div>
  </div>
</template>
<script>
import Radio from '../../Common/Radio'
import Date from '../../Common/Date'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PFilter',
  components: {
    Radio,
    Date
  },
  props: {
    showDate: Boolean,
    industry: Number
  },
  data () {
    return {
      careaname: '', // 标识搜索后的地区
      searchItem: { // 默认搜索值
        startyear: null,
        startmonth: null,
        endyear: null,
        endmonth: null,
        companytype: 0, // 行业默认
        area: -1 // 全省默认
      },
      areas: {},
      companies: {
        type: 'companytype',
        title: '公司类型',
        items: [
          {
            id: 0,
            name: '行业'
          }
          // {
          //   id: 1,
          //   name: '寿险类型'
          // },
          // {
          //   id: 2,
          //   name: '财险类型'
          // },
          // {
          //   id: 3,
          //   name: '中介类型'
          // }
        ]
      },
      times: {
        type: 'time',
        title: '时间区间',
        items: [
          {
            id: 0,
            name: '本月'
          },
          {
            id: 1,
            name: '近三个月'
          },
          {
            id: 2,
            name: '近六个月'
          }
        ],
        startyear: null,
        startmonth: null,
        endyear: null,
        endmonth: null
      }
    }
  },
  computed: {
    ...mapState(['area', 'areaname', 'startmonth', 'startyear', 'endmonth', 'endyear'])
  },
  methods: {
    ...mapMutations(['changeArgs']),
    // 点击空白隐藏左边栏
    filterHide () {
      this.$emit('filterControl', false)
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      if (info.type === 'time') {
        // 更新开始结束时间
        let {startyear, startmonth, endyear, endmonth} = info
        // 处理开始日期大于结束日期
        if (this.$refs['timezone']) {
          let data = this.$refs['timezone'].$data
          if (startyear > endyear) {
            data.cstartyear = endyear
            data.cstartmonth = endmonth
            data.startPicker.setValues([endyear, endmonth])
          }
          if (startyear === endyear && startmonth > endmonth) {
            data.cstartmonth = endmonth
            data.startPicker.setValues([startyear, endmonth])
          }
        }
        this.searchItem = Object.assign({}, this.searchItem, {startyear, startmonth, endyear, endmonth})
      } else if (info.type === 'area') {
        this.searchItem[info.type] = info.id
        this.careaname = info.name // 点击存储当前地区名, 搜索时用
      } else {
        this.searchItem[info.type] = info.id
      }
    },
    // 搜索
    search () {
      // 点击搜索的时候改变vuex中的值
      let {area, companytype, startyear, startmonth, endyear, endmonth} = this.searchItem
      console.log(this.searchItem)
      // 改变vuex的值
      this.changeArgs({areaname: this.careaname, area, companytype, startyear, startmonth, endyear, endmonth})
      // this.$router.go(0) // safari中不好使
      window.location.reload()
    },
    // 重置筛选
    reset () {
      for (let keys in this.$refs) {
        let data = this.$refs[keys].$data
        if (data.type === 'time') {
          // 重置picker
          data.curItem = -1
          data.cstartyear = this.startyear
          data.cstartmonth = this.startmonth
          data.cendyear = this.endyear
          data.cendmonth = this.endmonth
          data.startPicker.setValues([this.startyear, this.startmonth])
          data.endPicker.setValues([this.endyear, this.endmonth])
        } else {
          data.curItem = 0
        }
      }
      this.careaname = this.areaname
      this.searchItem = { // 重置搜索值
        startyear: this.startyear,
        startmonth: this.startmonth,
        endyear: this.endyear,
        endmonth: this.endmonth,
        companytype: 0, // 行业默认
        area: -1 // 全省默认
      }
    },
    _initFilter () {
      this.axios.get('/jmobile/index/area/uid/' + localStorage.getItem('uid'))
      // axios.get('/api/filters.json')
        .then((res) => {
          if (res.status) {
            this.areas = res.data.data
            this.searchItem = Object.assign({}, this.searchItem, {area: this.areas.items[0].id})
          } else {
            this.$toast({
              message: res.data.info,
              duration: 5000
            })
          }
        })
        .catch(() => {
          this.$indicator.close()
        })
    }
  },
  mounted () {
    this._initFilter()
    // 动态给日期组件和默认参数传递日期
    this.times = Object.assign({}, this.times, {startyear: this.startyear, startmonth: this.startmonth, endyear: this.endyear, endmonth: this.endmonth})
    this.searchItem = Object.assign({}, this.searchItem, this.startmonth, {startyear: this.startyear, startmonth: this.startmonth, endyear: this.endyear, endmonth: this.endmonth})
    let name = ''
    if (this.industry === 1) {
      name = '寿险类型'
    } else if (this.industry === 2) {
      name = '财险类型'
    } else if (this.industry === 3) {
      name = '中介类型'
    }
    this.companies.items.push({id: this.industry, name})
  }
}
</script>
<style lang="stylus" scoped>
.filter-content
  padding-bottom 1.4rem
  height 100%
  .filter-inner
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling touch
    // i.arrow
    //   position absolute
    //   right .22rem
    //   top 50%
    //   margin-top -0.06rem
    //   width .22rem
    //   height .12rem
    //   transform rotate(-180deg)
    //   bg-img(.22rem, .12rem, left, center)
    //   background-image url(../../../assets/images/arrow_down.png)
.btns
  position fixed
  width 75%
  right 0
  bottom 0
  padding .3rem .2rem
  display flex
  z-index 100000
  button
    flex 1
    outline none
    background none
    border none
    color $commonTxtColor
    height .8rem
    line-height .8rem
    text-align center
    font-size .3rem
    border-radius 5px
    &.reset-btn
      margin-right .34rem
      background #3f6a88
    &.search-btn
      background #2649ba
</style>
