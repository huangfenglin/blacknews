<template>
  <div class="wrapper" @click="jumPage">
    <div class="left">
      {{label}}
    </div>
    <div class="right">
      {{desc}}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label','desc'],
  methods: {
    jumPage(){
      // console.log(this.label);
      
      this.$emit('jump', this.label)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-left: 5.556vw;
  display: flex;
  justify-content: space-between;
  line-height: 13.889vw;
  border-bottom: 1px solid #eee;
  
  .right {
    font-size: 14px;
    color: #999;
    .iconjiantou1 {
        font-size: 14px;
        color:#999;
        padding-left:2.778vw;
        padding-right:5.833vw;
    }
  }
}
</style>