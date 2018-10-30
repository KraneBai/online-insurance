<template>
  <section class="filter-opts-item border-bottom">
    <h3>
      {{multi.title}}
      <slot name="arrow"></slot>
    </h3>
    <div class="filter-item">
      <span
        class="border"
        v-for="(item, key) of multi.items"
        :key="'multi-' + key"
        :class="{active: 0 === key}"
        :style="{fontSize: item.length > 6 ? '.16rem' : '.22rem'}"
        @click="multiSelect(key, item, multi.type)"
        ref="multiItem"
      >{{item}}</span>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Multi',
  props: {
    multi: Object
  },
  methods: {
    multiSelect (key, item, type) {
      let curItems = this.$refs.multiItem
      // 设置是否选中
      if (curItems[key].className.indexOf('active') > -1) {
        curItems[key].setAttribute('class', 'border')
      } else {
        curItems[key].setAttribute('class', 'border active')
      }
      // 增加删除值
      let itemArr = []
      curItems.forEach((item) => {
        if (item.className.indexOf('active') > -1) {
          itemArr.push(item.innerHTML)
        }
      })
      // 传给上级当前选中的值, 更新搜索条件
      this.$emit('getType', {type, item: itemArr})
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
