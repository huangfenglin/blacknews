<template>
  <div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="userName">
      <authInput
        type="text"
        placeholder="用户名/手机号码"
        rule="^\d{4,16}$"
        err_message="请输入正确的用户名或手机号码"
        @input="setUserName"
      ></authInput>
    </div>

    <div class="nickName">
      <authInput
        type="text"
        placeholder="请输入昵称"
        rule="^\w{4,16}$"
        err_message="请输入正确昵称"
        @input="setNickName"
      ></authInput>
    </div>

    <div class="userPwd">
      <authInput
        type="password"
        placeholder="请输入密码"
        rule="^\d{3,16}$"
        err_message="请输入正确密码"
        @input="setUserPwd"
      ></authInput>
    </div>
    <div class="btn">
            <authBtn text="注册" @send="sendRegister"/>
        </div>
  </div>
</template>

<script>
import authInput from "../components/authInput";
import authBtn from "../components/authBtn";
export default {
  components: {
    authInput,
    authBtn
  },
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    setUserName(name) {
      this.username = name
    },
    setNickName(nickname){
      this.nickname = nickname
    },
    setUserPwd(password){
      this.password = password
    },
    sendRegister(){
      this.$axios({
        url: 'http://127.0.0.1:3000/register',
        method: 'post',
        data: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        }
      }).then( res => {
        if(res.data.statusCode && res.data.statusCode == 400){
          this.$toast.fail(res.data.message)
        }else {
          this.$toast.success(res.data.message)
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 5.556vw;
}
.closeBtn {
  padding-top: 20px;
  .iconfont {
    font-size: 7.5vw;
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
</style>