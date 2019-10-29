<template>
  <div class="header">
      <span class="iconfont iconnew"></span>
      <div class="middle">
          <div class="search">
              <span class="iconfont iconsearch"></span>
              搜索新闻
          </div>
      </div>
      <router-link to="/profile">
        <span class="iconfont iconwode"></span>
      </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .header {
        background-color: red;
        height: 13.611vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding: 0 2.778vw;      
    }
    .middle {
        flex: 1;
        .search {
            width: 58.333vw;
            line-height: 9.444vw;
            text-align: center;
            border-radius: 4.722vw;
            margin:0 auto;
            background: rgba(255, 255, 255, .4);
        }
    }
    .iconnew {
        font-size: 15vw;
    }
    .iconwode {
        font-size: 8.889vw;
        opacity: .6;
    }
</style>