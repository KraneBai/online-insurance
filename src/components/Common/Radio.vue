<template>
  <section class="filter-opts-item border-bottom">
    <h3>
      {{radio.title}}
      <slot name="subtit"></slot>
      <slot name="arrow"></slot>
    </h3>
    <slot name="input"></slot>
    <div class="filter-item">
      <span
        class="border"
        v-for="(item, key) of radio.items"
        :key="item.id"
        :class="{active: curItem === key}"
        :style="{fontSize: item.name.length > 7 ? '.16rem' : '.22rem'}"
        @click="radioSelect(item.id, key, radio.type, item.name)"
        :ref="radio.type"
      >{{item.name}}</span>
    </div>
    <slot name="picker"></slot>
  </section>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    radio: Object
  },
  data () {
    return {
      curItem: 0
    }
  },
  methods: {
    // 改变当前选中的tab
    radioSelect (id, key, type, name) {
      this.curItem = key
      if (type === 'age') { // 输入的年龄为空, 置空操作在前
        let minage = ''
        let maxage = ''
        let info = this.radio.items[key]
        this.$emit('getType', {type, minage, maxage, min: info.min, max: info.max})
      } else {
        this.$emit('getType', {id, type, name})
      }
    }
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
</style>
