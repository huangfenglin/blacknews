<template>
  <div class="header">
    <span class="iconfont iconjiantou2" @click="back"></span>
    <div class="title"><span>{{title}}</span></div>
  </div>
</template>

<script>
export default {
  props:["title"],
  methods: {
    back() {
      this.$emit('previousPage')
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    height: 13.889vw;
    align-items: center;
    justify-content: space-between;
    span,.title {
      flex: 50%
    }
    .iconfont {
        padding: 0 2.778vw;
    }
    .title{
      text-align: center;
      font-weight: bold;
      transform: translateX(-50%)
    }
  }
</style>