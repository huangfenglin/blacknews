<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 输入框 -->
    <div class="inputName">
      <auth-input
        type="text"
        placeholder="请输入手机号"
        rule="^\d{4,16}$"
        err_message="请输入正确手机号"
        @input="setUserName"
      ></auth-input>
    </div>
    <!-- 密码框 -->
    <div class="inputPwd">
      <auth-input
        type="password"
        placeholder="请输入密码"
        rule="^\d{3,16}$"
        err_message="请输入正确密码"
        @input="setUserPwd"
      ></auth-input>
    </div>
    <div class="loginBtn">
      <auth-btn text="登陆" @send="sendLogin"></auth-btn>
    </div>
    <div class="register">
      还没有账号?
      <router-link to="/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
import authInput from "@/components/authInput";
import authBtn from "@/components/authBtn";
export default {
  components: {
    authInput,
    authBtn
  },
  data() {
    return {
      userName: "",
      userPwd: ""
    };
  },
  methods: {
    setUserName(name) {
      this.userName = name;
    },
    setUserPwd(password) {
      this.userPwd = password;
    },
    sendLogin() {
      // 发送ajax请求
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username: this.userName,
          password: this.userPwd
        }
      }).then(res => {
        // console.log(res);
        
        if (!res.data.statusCode) {
          // 保存登陆成功返回来的数据
          localStorage.setItem('token',res.data.data.token);
          localStorage.setItem('user_id',res.data.data.user.id)

          // 提示登陆成功
          this.$toast.success(res.data.message);
          setTimeout(() => {
            this.$router.push({
              name: "homePage"
            })
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 5.556vw;
  .closeBtn {
    padding-top: 20px;
    .iconfont {
      font-size: 7.5vw;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  .iconfont {
    font-size: 35vw;
    color: #d81e06;
  }
}
.register {
  text-align: center;
  margin-top: 6.667vw;
}
</style>