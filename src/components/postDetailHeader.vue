<template>
  <div class="header">
    <div class="left" @click="$router.back()">
      <span class="iconfont iconjiantou2"></span>
      <span class="iconfont iconnew"></span>
    </div>
    <div class="btnFollowActive" v-if="!post.has_follow" @click="follow">关注</div>
    <div class="btnFollow" v-if="post.has_follow" @click="unfollow">已关注</div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    follow() {
      this.$axios({
        url: "/user_follows/" + this.post.user.id,
        method: "get"
      }).then(res => {
        const { message } = res.data;

        if(message == '关注成功') {
            this.post.has_follow = true
        } 

      });
    },
    unfollow(){
        this.$axios({
            url: '/user_unfollow/' + this.post.user.id,
            method: 'get'
        }).then(res=>{
            const {message} = res.data;
            if(message == "取消关注成功") {
                this.post.has_follow = false;
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 13.889vw;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.left {
  display: flex;
  align-items: center;
}
.iconnew {
  margin-left: 1.111vw;
  font-size: 15vw;
}
.btnFollowActive {
  background-color: red;
  color: white;
  padding: 0 4.167vw;
  height: 7.222vw;
  line-height: 7.222vw;
  border-radius: 3.611vw;
  border: 1px solid red;
}
.btnFollow {
  color: #888;
  padding: 0 4.167vw;
  height: 7.222vw;
  line-height: 7.222vw;
  border-radius: 3.611vw;
  border: 1px solid #888;
}
</style>