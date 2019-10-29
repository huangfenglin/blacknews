<template>
  <div>
    <homeHeader></homeHeader>
    <van-tabs v-model="activeTab">
      <van-tab v-for="(tabItem,index) in tabList" :key="index" :title="tabItem.name">内容 {{tabItem.name}}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import homeHeader from "../components/homeHeader";
export default {
  components: {
    homeHeader
  },
  data(){
    return {
      tabList: [],
      activeTab: 2
    }
  },
  mounted() {
    this.$axios({
      url:'/category'
    }).then(res=>{
      console.log(res);
      const {data} = res.data
      this.tabList = data
      
    })
  }
};
</script>

<style lang="less" scoped>
</style>