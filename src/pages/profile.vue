<template>
  <div>
    <div class="profile">
      <div class="infot-left">
        <img v-if="!profile.head_img" class="avatar" src="@/assets/images/timg.jpg" alt="">
        <img v-else class="avatar" :src="'http://127.0.0.1:3000'+profile.head_img" />
        <div class="profile-middle">
          <div class="name">
            <span v-if="profile.gender == 1" class="iconfont iconxingbienan"></span>
            <span v-else class="iconfont iconxingbienv"></span>
            {{profile.nickname}}
          </div>
          <div class="time">2019-10-10</div>
        </div>
      </div>
      <span id="rightjiantou" class="iconfont iconjiantou1"></span>
    </div>
    <cellBar label="我的关注" desc="关注的用户" @jump="jumpToPage" />
    <cellBar label="我的跟帖" desc="跟帖/回复" @jump="jumpToPage" />
    <cellBar label="我的收藏" desc="文章/视频" @jump="jumpToPage" />
    <cellBar label="设置" @jump="jumpToPage" />
  </div>
</template>

<script>
import cellBar from "@/components/cellBar";
export default {
  data() {
    return {
      profile: {}
    };
  },
  components: {
    cellBar
  },
  methods: {
    jumpToPage(label) {
      console.log("跳转到" + label + "页面");
    }
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      methods: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      // console.log(res);

      this.profile = res.data.data;
      // this.profile.head_img === ""
      //   ? (this.profile.head_img = "@/assets/images/timg.jpg")
      //   : this.profile;
      console.log(this.profile);
    });
    }
};
</script>

<style lang="less"scoped>
.profile {
  display: flex;
  padding: 6vw 5.556vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;
  .infot-left {
    display: flex;
    justify-content: center;
    align-items: center;
    .profile-middle {
      padding-left: 2.778vw;
      font-size: 16px;
      .time {
        padding-top: 3px;
        font-size: 14px;
        color: #a1a1a1;
      }
    }
  }
}
.iconfont.iconxingbienan {
  background-color: #fff;
  color: #75b9eb;
}
#rightjiantou {
  padding-left: 5px;
  color: #a1a1a1;
}
.avatar {
  width: 19.444vw;
  border-radius: 50%;
}
</style>