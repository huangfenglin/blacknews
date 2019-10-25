<template>
  <input class="input" :class="{error: !isOK}" :type="type" :placeholder="placeholder" @input="dataChange" @blur="showTips">
</template>

<script>
export default {
  props:['type',"placeholder",'rule','err_message'],
  data(){
    return {
      isOK: true
    }
  },
  methods: {
        showTips($event) {
        // 只有当前的 isOk 值为 false 才会弹窗
        if (!this.isOK) {
            // alert(this.err_message)
            this.$toast.fail(this.err_message);
        }
    },
    dataChange($event){
      if(!$event.target.value){
        this.isOK = true;
      }else {
        // 进行表单验证
        let regex = new RegExp(this.rule);
        this.isOK = regex.test($event.target.value)
      }
      // if(!this.isOK){
      //   this.$toast.fail(this.err_message);
      // }

      this.$emit('input',$event.target.value)
    }
  }
}
</script>

<style scoped lang="less">
.input {
  margin-bottom:5.556vw;
  width: 100%;
  height: 10.556vw;
  padding:5.556vw;
  background-color: #fff;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #666;
  outline:none

}
.error {
  border-color: red;
}
</style>