<template>
  <div>
    <headerMiddle @previousPage="$router.back('/profile')" title="编辑资料" />
    <div class="avatar">
      <img class="avatar-img" :src="profile.head_img" alt />
    </div>
    <cell-bar label="昵称" :desc="profile.nickname" @jump="isShowNickname=true" />
    <cell-bar label="密码" desc="******" @jump="isShowPwd=true" />
    <cell-bar label="性别" :desc="profile.gender" @jump="isShowGender=true" />

    <!-- 写入弹窗的组件 -->

    <!-- 修改昵称 -->
    <van-dialog
      v-model="isShowNickname"
      title="编辑昵称"
      show-cancel-button
      @confirm="editProfile({nickname: newNickname})"
    >
      <van-field v-model="newNickname" placeholder="请输入昵称名" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog
      v-model="isShowPwd"
      title="修改密码"
      show-cancel-button
      @confirm="editProfile({password: newPwd})"
    >
      <van-field type="password" v-model="newPwd" placeholder="请输入新密码" />
    </van-dialog>

    <!-- 修改性别 -->
    <van-action-sheet
      v-model="isShowGender"
      :actions="genderList"
      @select="selectGender"
      cancel-text="取消"
    />
  </div>
</template>

<script>
// 引入头部组件和输入框组件

import headerMiddle from "@/components/headerMiddle";
import cellBar from "@/components/cellBar";

export default {
  data() {
    return {
      isShowNickname: false,
      isShowPwd: false,
      // 存放新修改的值
      newNickname: "",
      newPwd: "",
      isShowGender: false,

      genderList: [
        {
          name: "男"
        },
        {
          name: "女"
        }
      ],

      profile: {}
    };
  },
  methods: {
    // 公共ajax
    loadPage() {
      this.$axios({
        url: /user/ + localStorage.getItem("user_id"),
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        this.profile = res.data.data;

        // 根据profile.head_img的值设置默认图片
        this.profile.head_img === ""
          ? (this.profile.head_img = "/static/images/timg.jpg")
          : (this.profile.head_img =
              this.$axios.defaults.baseURL + this.profile.head_img);

        // 根据profile.gender的值重新修改性别
        this.profile.gender = this.profile.gender == 0 ? "女" : "男";
      });
    },

    // 修改昵称 和修改密码
    editProfile(newData) {
      // console.log("修改昵称");
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: newData
      }).then(res => {
        this.loadPage();
      });
    },
    // 修改性别
    selectGender(item) {
      this.editProfile({
        gender: item.name == "男" ? 1 : 0
      });
      this.isShowGender = false;
    }
  },
  components: {
    cellBar,
    headerMiddle
  },
  mounted() {
    this.loadPage();
  }
};
</script>

<style lang="less" scoped>
.avatar {
  padding: 8.333vw;
  text-align: center;
}
.avatar-img {
  width: 19.444vw;
  border-radius: 50%;
}
</style>