<template>
  <div class="footer">
    <div class="disable" v-if="!isFocus">
      <input type="text" class="commentInput" placeholder="写跟帖" @focus="showArea" />
      <div class="commentIcon">
        <div class="commentNumber">1020</div>
        <span class="iconfont iconpinglun-"></span>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 激活后的状态 -->
    <div class="enable" v-if="isFocus">
      <textarea class="commentArea" @blur="isFocus=false" ref="commentArea"></textarea>
      <div class="btnSend">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { isFocus: false };
  },
  methods: {
    showArea() {
      this.isFocus = true;

      this.$nextTick(() => {
        this.$refs.commentArea.focus();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .disable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.778vw;
    .commentInput {
      height: 8.611vw;
      line-height: 8.611vw;
      font-size: 3.889vw;
      border: none;
      outline: none;
      border-radius: 4.444vw;
      padding: 0 4.444vw;
      background: #d7d7d7;
      color: #666;
    }
    .iconfont {
      font-size: 6.389vw;
    }
    .commentIcon {
      position: relative;
      .commentNumber {
        position: absolute;
        box-sizing: border-box;
        top: -8px;
        height: 4.444vw;
        line-height: 4.444vw;
        font-size: 3.333vw;
        background: red;
        color: #fff;
        border-radius: 2.222vw;
        padding: 0 2.222vw;
        left: 0.556vw;
      }
    }
  }
  // 第二套CSS

  .enable {
    display: flex;
    padding: 2.778vw;
    justify-content: space-between;
    align-items: flex-end;
    .commentArea {
      box-sizing: border-box;
      width: 75vw;
      background: #d7d7d7;
      color: #666;
      border: none;
      outline: none;
      border-radius: 2.222vw;
      padding: 4.444vw;
      resize: none;
    }
    .btnSend {
      background-color: red;
      color: #fff;
      padding: 0 4.167vw;
      height: 7.222vw;
      line-height: 7.222vw;
      border-radius: 3.611vw;
      border: 1px solid red;
      font-size: 14px;
    }
  }
}
</style>