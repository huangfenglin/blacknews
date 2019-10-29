<template>
  <div>
    <headerMiddle title="我的关注" />
    <div class="item" v-for="(item,index) in myFollows" :key="index">
      <!-- 这里是每一个关注框 -->
      <img :src="item.head_img" alt class="avatar" />
      <div class="itemMiddle">
        <div class="name">{{item.nickname}}</div>
        <div class="data">2019-10-04</div>
      </div>
      <div class="btnCancel" @click="cancelFollow(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
import headerMiddle from "../components/headerMiddle";
export default {
  data() {
    return {
      myFollows: []
    };
  },
  components: {
    headerMiddle
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user_follows",
        method: "get"
      }).then(res => {
        console.log(res);

        this.myFollows = res.data.data;

        // 不确定所有数据都有头像处理头像数据
        this.myFollows.forEach(e => {
          if (!e.head_img) {
            e.head_img = "/static/images/timg.jpg";
          } else {
            e.head_img = this.$axios.defaults.baseURL + e.head_img;
          }
        });
      });
    },
    // 取消关注
    cancelFollow(id) {
      this.$axios({
        url: "/user_unfollow/" + id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        // 取消关注已经成功了,刷新页面
        this.loadPage();
      });
    }
  },
  mounted() {
    this.loadPage();
  }
};
</script>

<style lang="less"scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5.556vw;
  border-bottom: 1px solid #eee;
}
.avatar {
  width: 11.111vw;
  border-radius: 5.556vw;
}
.itemMiddle {
  flex: 1;
  text-align: left;
  padding-left: 2.778vw;
  .date {
    font-size: 14px;
    color: #888;
  }
}
.btnCancel {
  height: 8.333vw;
  line-height: 8.333vw;
  padding: 0 2.778vw;
  background: #eee;
  color: #888;
  font-size: 14px;
  border-radius: 4.167vw;
}
</style>