<template>
  <div>
    <headerMiddle title="我的收藏"></headerMiddle>
    <!-- 第一种显示方式 -->
    <div class="item" v-for="(item,index) in collectiionList" :key="index">
      <div class="singleCover" v-if="item.cover.length == 1">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="info">{{item.user.nickname}} {{item.comments.length}}跟帖</div>
        </div>
        <div class="right">
          <img :src="item.cover[0].url" alt />
        </div>
      </div>

      <div class="multipCover" v-else>
        <div class="title">{{item.title}}</div>
        <div class="cover">
          <div class="imgWrapper">
            <img :src="item.cover[0].url" alt />
          </div>
          <div class="imgWrapper">
            <img :src="item.cover[1].url" alt />
          </div>
          <div class="imgWrapper">
            <img :src="item.cover[2].url" alt />
          </div>
        </div>
        <div class="info">{{item.user.nickname}} {{item.comments.length}}跟帖</div>
      </div>
    </div>
  </div>
</template>

<script>
import headerMiddle from "../components/headerMiddle";
export default {
  components: {
    headerMiddle
  },
  data() {
    return {
      collectiionList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/user_star",
      method: "get"
    }).then(res => {
      console.log(res);
      this.collectiionList = res.data.data;

      //  遍历每一个收藏数据,查看里面是否包含图片,进行相关处理
      this.collectiionList.forEach(e => {
        //   如果有图片继续遍历图片对图片类型进行处理
        if (e.cover) {
          e.cover.forEach(element => {
            if (element.url.indexOf("http") < 0) {
              element.url = this.$axios.defaults.baseURL + element.url;
            }
          });
        }
      });
    });
  }
};
</script>

<style lang="less" scoped>
// 第一套CSS
    .singleCover {
        padding: 5.556vw;
        display: flex;
        border-bottom: 1px solid #eee;
        .left {
            width: 70%;
            display: flex;
            flex-direction: column;
            padding: 0 2.778vw 0 0;
            .infot  {
                margin-top: 5.556vw;
                color: #888;
                font-size: 14px;
            }
        }
        .right {
            width: 30%;
            height: 20.556vw;
            overflow: hidden;
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    .multipCover {
        padding: 5.556vw;
        border-bottom: 1px solid #eee;
        .cover {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .imgWrapper {
                width: 32%;
                height: 20.556vw;
                overflow: hidden;
                img {
                    width: 100%;
                    height: auto;
                }
            }
        }
        .info {
            margin-top: 10px;
            font-size: 14px;
            color: #888;
        }
    }
</style>