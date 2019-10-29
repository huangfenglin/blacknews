<template>
  <div>
    <headerMiddle title="我的跟帖" />
    <div class="item" v-for="(item,index) in commentList" :key="index">
      <div class="date">2019-10-02</div>
      <div class="parent" v-if="item.parent">
        <div class="name">回复:{{item.parent.user.nickname}}</div>
        <div class="parentContent">{{item.parent.content}}</div>
      </div>
      <div class="mainContent">{{item.content}}</div>
      <div class="postOrigin">原文:{{item.post.title}}</div>
    </div>
  </div>
</template>

<script>
import headerMiddle from "../components/headerMiddle";
export default {
  components: {
    headerMiddle
  },
  data(){
    return {
      commentList: []
    }
  },
  mounted(){
    this.$axios({
      url:'/user_comments',
      method: 'get'
    }).then(res=>{
      console.log(res.data.data);
      this.commentList = res.data.data
      console.log(this.commentList);
      
      
    })
  }
};
</script>

<style lang="less" scoped>
.item {
  font-size: 14px;
  margin-top: 5px;
  padding: 5.556vw;
  border-bottom: 1px solid #eee;
}
.date {
  color: #888;
}
.postOrigin {
  margin-top: 2.778vw;
  color: #888;
}
.parent {
  margin-top: 2.778vw;
  padding: 5.556vw;
  color: #888;
  background: #eee;
  .parentContent {
    margin-top: 2.778vw;
  }
}
.mainContent {
  margin-top: 2.778vw;
}
</style>