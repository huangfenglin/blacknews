<template>
  <div>
    <!-- 单图片文章列表布局 -->
    <div class="singleImgPost">
      <div class="left">
        <div class="title">{{post.title}}</div>
        <div class="info">{{post.user.nickname}} {{post.comment_length}}</div>
      </div>
      <img :src="post.cover[0].url" alt class="imgRight" />
    </div>

    <!-- 第二种模板,封面图片大于等于三张的情况 -->
    <div class="multipImgPost" v-if="post.cover.length >= 3">
      <div class="title">{{post.title}}</div>
      <div class="covers">
        <img :src="post.cover[0].url" alt class="coverImg" />
        <img :src="post.cover[1].url" alt class="coverImg" />
        <img :src="post.cover[2].url" alt class="coverImg" />
      </div>
      <div class="info">{{post.user.nickname}} {{post.comment_length}}跟帖</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang="less" scoped>
.singleImgPost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.778vw;
  border-bottom: 1px solid #eee;
  .left {
    flex: 1;
    height: 20.833vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 2.778vw;
    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .info {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 14px;
      color: #888;
    }
  }
  .imgRight {
    width: 33.611vw;
    height: 20.833vw;
    object-fit: cover;
  }
}
// 第二种CSS
.multipImgPost {
  padding: 2.778vw;
  border-bottom: 1px solid #eee;
  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .covers {
    display: flex;
    justify-content: space-between;
    margin: 2.778vw 0;
    .coverImg {
      width: 33%;
      height: 20.556vw;
      object-fit: cover;
    }
  }
  .info {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 14px;
    color: #888;
  }
}
</style>