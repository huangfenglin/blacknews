<template>
  <div>
    <postDetailHeader  :post ="post"/>
    <div class="mainContent">
      <video
        class="video"
        controls="controls"
        :poster="post.cover[0].url"
        src="https://video.pearvideo.com/mp4/adshort/20191031/cont-1617802-14542116_adpkg-ad_hd.mp4 "
        v-if="post.type == 2"
      ></video>
      <div class="title">{{post.title}}</div>
      <div class="info" v-if="post.user">{{post.user.nickname}} 2019-10-31</div>
      <div class="content" v-html="post.content" v-if="post.type != 2"></div>
      <div class="actionBtns">
        <div class="like" @click="like">
          <span class="iconfont icondianzan" :class="{red: post.has_like}"></span>
          {{post.like_length}}
        </div>
        <div class="wechat">
          <span class="iconfont iconweixin"></span>
          <a
            href="https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Explanation_of_interface_privileges.html"
          >微信</a>
        </div>
      </div>
    </div>

    <postDetailFooter />
  </div>
</template>

<script>
import postDetailHeader from "../components/postDetailHeader";
import postDetailFooter from "../components/postDetailFooter";
export default {
  components: {
    postDetailHeader,
    postDetailFooter
  },
  data() {
    return {
      postID: this.$route.params.id,
      post: {}
    };
  },
  methods: {
    like() {
      this.$axios({
        url:'/post_like/' + this.post.id
      }).then(res=>{
        console.log(res.data);
        
        const {message} = res.data;

        switch (message) {
          case "点赞成功":
            this.post.has_like = true;
            this.post.like_length++
            break;
          case "取消成功":    
            this.post.like_length--
            this.post.has_like = false;   
            break;
        }
      })
    }
  },
  mounted() {
    this.$axios({
      url: "/post/" + this.postID,
      method: "get"
    }).then(res => {
      const { data } = res.data;
      this.post = data;
      console.log(data);
    });
  }
};
</script>

<style lang="less" scoped>
.mainContent {
  padding: 2.778vw;
  padding-bottom: 22.222vw
}
.title {
  font-size: 5.556vw;
  color: #333;
}
.info {
  margin: 5.556vw;
}
.content {
  /deep/ img {
    max-width: 100%;
  }
}
.video {
  width: 100%;
}
.actionBtns {
  margin: 5.556vw 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .like,
  .wechat {
    border: 1px solid #333;
    height: 8.333vw;
    line-height: 8.333vw;
    text-align: center;
    border-radius: 4.167vw;
    padding: 0 4.167vw;
    .iconfont {
      margin-right: 3px;
    }
  }
  .wechat {
    .iconfont {
      color: #00c800;
    }
  }
}
.red {
  color: red;
}
</style>