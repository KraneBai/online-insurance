<template>
  <div class="filter-opts">
    <div class="filter-opts-inner" v-if="radio">
      <radio
        v-for="item of radio"
        :key="item.type"
        :ref="item.type + 'zone'"
        :radio="item"
        @getType="getFilterInfo"
      >
        <div class="filter-inp" slot="input" v-if="item.type === 'age'">
          <p class="border"><input type="tel" v-model.trim="minage" placeholder="最小年龄"></p>
          <p class="border" style="margin: 0 .2rem"><input type="tel" v-model.trim="maxage" placeholder="最大年龄"></p>
          <!-- <input type="tel" v-model.trim="minage" placeholder="最小年龄">
          <input type="tel" v-model.trim="maxage" placeholder="最大年龄" style="margin: 0 .2rem"> -->
          <a @click.prevent="clearInp">清空</a>
        </div>
      </radio>
      <multi v-if="type === 'all'" @getType="getFilterInfo" :multi="multi"></multi>
    </div>
    <div class="btns">
      <button class="reset-btn" @click="reset">重置</button>
      <button class="search-btn" @click="searchChart">搜索</button>
    </div>
    <do-not-share></do-not-share>
  </div>
</template>
<script>
import Radio from '../../Common/Radio'
import Multi from '../../Common/Multi'
import DoNotShare from '../../Common/DoNotShare'
export default {
  name: 'DetailFilter',
  metaInfo: {
    title: '管理人员服务平台'
  },
  components: {
    Radio,
    Multi,
    DoNotShare
  },
  data () {
    return {
      searchItem: { // 默认搜索值
        max: '-1',
        min: '-1',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      },
      radio: {
        politicalRadio: {
          title: '政治面貌',
          type: 'political',
          items: [
            {
              id: 0,
              name: '不限'
            },
            {
              id: 1,
              name: '群众'
            },
            {
              id: 2,
              name: '共青团员'
            },
            {
              id: 3,
              name: '中共党员'
            }
          ]
        },
        educationRadio: {
          title: '文化程度',
          type: 'education',
          items: [
            {
              id: 0,
              name: '不限'
            },
            {
              id: 1,
              name: '初中及以下'
            },
            {
              id: 2,
              name: '高中'
            },
            {
              id: 3,
              name: '技工学校'
            },
            {
              id: 4,
              name: '中等专业学校和中等技术学校'
            },
            {
              id: 5,
              name: '大学专科和专科学校'
            },
            {
              id: 6,
              name: '大学本科'
            },
            {
              id: 7,
              name: '研究生'
            },
            {
              id: 8,
              name: '博士生'
            }
          ]
        },
        ageRadio: {
          title: '年龄',
          type: 'age',
          items: [
            {
              id: 0,
              name: '不限',
              min: -1,
              max: -1
            },
            {
              id: 1,
              name: '18-24岁',
              min: 18,
              max: 24
            },
            {
              id: 2,
              name: '25-34岁',
              min: 25,
              max: 34
            },
            {
              id: 3,
              name: '35-44岁',
              min: 35,
              max: 44
            },
            {
              id: 4,
              name: '45-54岁',
              min: 45,
              max: 54
            },
            {
              id: 5,
              name: '55-64岁',
              min: 55,
              max: 64
            },
            {
              id: 6,
              name: '65岁以上',
              min: 65,
              max: 66
            }
          ]
        },
        sexRadio: {
          title: '性别',
          type: 'sex',
          items: [
            {
              id: 0,
              name: '不限'
            },
            {
              id: 1,
              name: '男'
            },
            {
              id: 2,
              name: '女'
            }
          ]
        }
      },
      multi: {
        title: '留存率',
        type: 'retain',
        items: ['13个月留存率']
      }, // 所有动态列出的筛选项
      minage: '',
      maxage: '',
      type: 'all' // 默认人员概览
    }
  },
  watch: {
    minage (val) {
      if (val) {
        this.$refs.agezone[0].$data.curItem = -1
      } else if (!this.maxage) {
        let curAgeTab = this.$refs.agezone[0].$data.curItem
        this.$refs.agezone[0].$data.curItem = curAgeTab === -1 ? 0 : curAgeTab
      }
    },
    maxage (val) {
      if (val) {
        this.$refs.agezone[0].$data.curItem = -1
      } else if (!this.minage) {
        let curAgeTab = this.$refs.agezone[0].$data.curItem
        this.$refs.agezone[0].$data.curItem = curAgeTab === -1 ? 0 : curAgeTab
      }
    }
  },
  methods: {
    // 清空输入年龄
    clearInp () {
      // 清空当前输入的年龄
      this.minage = ''
      this.maxage = ''
      if (this.$refs.agezone[0].$data.curItem < 1) {
        this.$refs.agezone[0].$data.curItem = 0
      }
      this.searchItem = Object.assign({}, this.searchItem, {min: -1, max: -1})
    },
    // 子组件传给父组件, 改变搜索条件值
    getFilterInfo (info) {
      if (info.type === 'age') { // agetab切换的时候input年龄清空值
        this.minage = ''
        this.maxage = ''
        this.searchItem['min'] = info.min
        this.searchItem['max'] = info.max
      } else {
        this.searchItem[info.type] = info.name
      }
    },
    // 搜索
    searchChart () {
      // 对年龄参数的处理
      if (this.minage || this.maxage) {
        // 对输入不是数字的处理
        if (isNaN(this.minage)) {
          this.minage = ''
        }
        if (isNaN(this.maxage)) {
          this.maxage = ''
        }
        this.searchItem = Object.assign({}, this.searchItem, {min: this.minage, max: this.maxage})
      }
      this.type = this.$route.query.type // 只有人员概览有留存率
      let sign = ''
      if (this.type === 'leave') {
        sign = 2
      } else if (this.type === 'add') {
        sign = 1
      } else {
        sign = 0
      }
      // 刨除不限的参数置为空
      for (let item in this.searchItem) {
        if (this.searchItem[item] === '不限') {
          this.searchItem[item] = ''
        }
      }
      let {sex, education, political, min, max} = this.searchItem
      this.$router.push({name: 'DCharWrap', query: {sex, education, political, min, max, sign}})
    },
    // 重置筛选
    reset () {
      for (let keys in this.$refs) {
        this.$refs[keys][0].$data.curItem = 0
        this.minage = ''
        this.maxage = ''
      }
      this.searchItem = { // 重置搜索值
        min: '-1',
        max: '-1',
        education: '不限',
        sex: '不限',
        political: '不限',
        retain: ['13个月留存率']
      }
    }
  },
  created () {
    this.$indicator.close()
    this.type = this.$route.query.type
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts
  box-sizing border-box
  padding-bottom 1.4rem
  width 100%
  height 100%
  background linear-gradient(to bottom, #182649, #1d5174)
  .filter-opts-inner
    height 100%
    overflow-y auto
    -webkit-overflow-scrolling touch
  .btns
    position fixed
    left 0
    right 0
    bottom 0
    padding .3rem .2rem
    display flex
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
  >>>
    .filter-inp
      display flex
      padding-left .2rem
      // padding-right .8rem
      padding-right .2rem
      margin-top .2rem
      align-items center
      p
        display inline-block
        flex 1
        min-width 30%
        border-radius 5px
        &::before
          border-color $borderColor
          border-radius 5px
        input
          position relative
          width 100%
          height .7rem
          background none
          color $txtColor
          text-align center
          z-index 999
          &::placeholder
            color $txtColor
      // input
      //   flex 1
      //   background none
      //   color $txtColor
      //   text-align center
      //   min-width 30%
      //   // width 45%
      //   height .6rem
      //   border-radius 5px
      //   border 1px solid $borderColor
      //   outline none
      //   font-size .22rem
      //   &::placeholder
      //     color $txtColor
      span
        margin 0 .2rem
        height .02rem
        width .3rem
        background $borderColor
      a
        flex 1
        min-width 30%
        // margin-left .2rem
        font-size .26rem
        white-space nowrap
        color #25a4bb
</style>
