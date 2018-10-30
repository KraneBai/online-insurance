<template>
  <section class="filter-opts-item border-bottom">
    <h3>{{radio.title}}<span>{{cstartyear}}/{{cstartmonth}}-{{cendyear}}/{{cendmonth}}</span></h3>
    <div class="filter-item">
      <span
        class="border"
        v-for="(item, key) of radio.items"
        :key="item.id"
        :class="{active: curItem === key}"
        :style="{fontSize: item.name.length > 7 ? '.16rem' : '.22rem'}"
        @click="radioSelect(key)"
      >{{item.name}}</span>
    </div>
    <div class="filter-time">
      <h2>
        <span>开始日期</span>
        <span>结束日期</span>
      </h2>
      <div class="time-wrapper">
        <mt-picker ref="startPicker" :visibleItemCount="3" :slots="slotsStart" @change="startChange"></mt-picker>
        <mt-picker ref="endPicker" :visibleItemCount="3" :slots="slotsEnd" @change="endChange"></mt-picker>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Date',
  props: {
    radio: Object
  },
  data () {
    return {
      type: 'time', // 用于上级重置时filter其为curItem: -1
      curItem: -1, // 默认不选中
      cstartyear: null,
      cstartmonth: null,
      cendyear: null,
      cendmonth: null,
      startPicker: '',
      endPicker: ''
    }
  },
  computed: {
    slotsStart () {
      return this._initSlot('start')
    },
    slotsEnd () {
      return this._initSlot('end')
    }
  },
  methods: {
    radioSelect (key) {
      let minus = 0
      if (key === 1) {
        minus = 2 // 近3个月
      }
      if (key === 2) {
        minus = 5 // 近6个月
      }
      let today = new Date()
      this.cendmonth = today.getMonth() + 1
      this.cendyear = today.getFullYear()
      if (this.cendmonth - minus > 1) {
        this.cstartmonth = this.cendmonth - minus
        this.cstartyear = this.cendyear
      } else {
        this.cstartmonth = 12 - Math.abs(this.cendmonth - minus)
        this.cstartyear = this.cendyear - 1
      }
      this.startPicker.setValues([this.cstartyear, this.cstartmonth])
      this.endPicker.setValues([this.cendyear, this.cendmonth])
      this.$emit('getType', {startyear: this.cstartyear, startmonth: this.cstartmonth, endyear: this.cendyear, endmonth: this.cendmonth, type: 'time'})
      setTimeout(() => { // 解决初始化点击本月的时候不生效
        // this.$refs.timeItem[key].setAttribute('class', 'border active')
        this.curItem = key
      }, 50)
    },
    // 初始化日期picker参数
    _initSlot (type) {
      let month = new Date().getMonth()
      let monthArr = [] // 动态设置月份选项
      let monthIdx = null // 默认显示第几个月
      // 2017年只有12月份 其他月份根据当前年过了几个月显示几个月
      if ((this.radio.startyear === 2017 && type === 'start') || (this.radio.endyear === 2017 && type === 'end')) {
        monthArr = [12]
        monthIdx = 0
      } else {
        for (let m = 0; m <= month; m++) {
          monthArr.push(m + 1)
        }
        monthIdx = this.radio[type + 'month'] - 1
      }
      let year = new Date().getFullYear()
      let yearArr = []
      let yearIdx = this.radio[type + 'year'] - 2017
      for (let y = 2017; y <= year; y++) {
        yearArr.push(y)
      }
      let slot = [
        {
          defaultIndex: yearIdx, // 默认第几个
          flex: 1,
          values: yearArr,
          textAlign: 'right'
        },
        {
          defaultIndex: monthIdx,
          flex: 1,
          values: monthArr
        }
      ]
      return slot
    },
    startChange (picker, values) {
      this.startPicker = picker
      this.pickerChange(picker, values[0])
    },
    endChange (picker, values) {
      this.endPicker = picker
      this.pickerChange(picker, values[0])
    },
    pickerChange (picker, val) {
      // 当年份改变时, 月份动态随着联动
      let monthArr = []
      if (val === 2017) {
        monthArr = [12]
        picker.setSlotValues(1, monthArr)
      } else if (val === new Date().getFullYear()) {
        for (let i = 1; i <= new Date().getMonth() + 1; i++) {
          monthArr.push(i)
        }
        picker.setSlotValues(1, monthArr)
      } else {
        monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        picker.setSlotValues(1, monthArr)
      }
      // 当日期picker选择日期时, tab就默认不选中
      this.curItem = -1
      // 日期picker值改变时, 同时改变显示值
      if (this.startPicker && this.endPicker) {
        let start = this.startPicker.getValues()
        let end = this.endPicker.getValues()
        this.cstartyear = start[0]
        this.cstartmonth = start[1]
        this.cendyear = end[0]
        this.cendmonth = end[1]
        this.$emit('getType', {startyear: this.cstartyear, startmonth: this.cstartmonth, endyear: this.cendyear, endmonth: this.cendmonth, type: 'time'})
      }
    }
  },
  mounted () {
    this.cstartyear = this.radio.startyear
    this.cstartmonth = this.radio.startmonth
    this.cendyear = this.radio.endyear
    this.cendmonth = this.radio.endmonth
  }
}
</script>
<style lang="stylus" scoped>
.filter-opts-item
  padding .3rem 0
  &::before
    border-color #3043a9
  h3
    padding 0 .2rem
    position relative
    color $commonTxtColor
    font-size .26rem
    line-height .3rem
    span
      margin-left .2rem
      color $txtColor
      letter-spacing .02rem
  .filter-item
    padding 0 .1rem
    display grid
    grid-template-columns: repeat(3, 1fr)
    span
      display flex
      padding .05rem
      margin .2rem .1rem 0
      box-sizing border-box
      align-items center
      justify-content center
      text-align center
      height .7rem
      color $txtColor
      font-size .24rem
      &::before
        border-color $borderColor
        border-radius 5px
      &.active
        background-color $borderColor
        color $commonTxtColor
        border-radius 5px
  .filter-time
    h2
      margin .4rem 0 .14rem
      display flex
      span
        flex 1
        color #009ec5
        font-size .26rem
        text-align center
    .time-wrapper
      display flex
    >>>
      .picker
        flex 1
      .picker:first-child
        padding-right .22rem
      .picker:last-child
        padding-left .22rem
      .picker-item
        padding 0 .05rem
        color #0c6f92
      .picker-item.picker-selected
        color $borderColor
      .picker-center-highlight:before,
      .picker-center-highlight:after
        background-color $borderBottomColor
</style>
