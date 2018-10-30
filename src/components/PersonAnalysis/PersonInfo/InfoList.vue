<template>
  <ul class="messages">
    <li
      :class="{unread: !item.read_at}"
      class="border-bottom"
      v-for="item of messages"
      :key="item.id"
      @click="details(item.id)"
    >
      <p>{{item.title}}</p>
      <span>{{item.created_at}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'InfoList',
  metaInfo: {
    title: '管理人员服务平台'
  },
  props: {
    messages: Array,
    type: String
  },
  data () {
    return {
      unread: true
    }
  },
  methods: {
    // 详细查看
    details (id) {
      this.$router.push({name: 'InfoDetail', params: { id, type: this.type }})
    }
  }
}
</script>
<style lang="stylus" scoped>
.messages
  li
    padding .26rem .32rem .2rem
    line-height .5rem
    &.unread
      bg-img(.14rem, .14rem, .1rem, .42rem)
      background-image url(../../../assets/images/point.png)
    &::before
      border-color $borderBottomColor
    p
      text-hidden()
      font-size .28rem
      color $commonTxtColor
    span
      display block
      text-align right
      color $txtColor
      font-size .24rem
</style>
