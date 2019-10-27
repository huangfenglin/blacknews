<template>
  <div>
    <headerMiddle @previousPage="$router.back('/profile')" title="编辑资料"/>
    <div class="avatar">
      <img class="avatar-img" src="@/assets/images/timg.jpg" alt="">
    </div>
    <cellBar label="昵称" desc="火星网友"/>
    <cellBar label="密码" desc="******"/>
    <cellBar label="性别" desc="男"/>


  </div>
</template>

<script>
import headerMiddle from '@/components/headerMiddle'
import cellBar from '@/components/cellBar';
export default {
  data(){
    return {profile:{}}
  },
  methods: {
    // last(){

    // }
  },
  components: {
    cellBar,
    headerMiddle
  },
  // mounted() {
  //   this.$axios({
  //     url: "/user_update/",
  //     methods: "post",
  //     data: {
  //       id: localStorage.getItem("user_id")
  //     },
  //     headers: {
  //       Authorization: localStorage.getItem("token")
  //     }
  //   }).then(res => {
  //     console.log(res);

  //     this.profile = res.data.data;
  //     // this.profile.head_img === ""
  //     //   ? (this.profile.head_img = "@/assets/images/timg.jpg")
  //     //   : this.profile;
  //     console.log(this.profile);
  //   });
  // }
}
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