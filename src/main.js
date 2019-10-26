// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// ajax请求: axios库
import axios from "axios";

//引入组件库
import {Toast} from 'vant';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
// 基准路径
axios.defaults.baseURL = "http://127.0.0.1:3000"

/* eslint-disable no-new */
// axios 拦截器
axios.interceptors.response.use((res)=>{
  const {message,statuCode} = res.data;
  if(message && statuCode == 401) {
    Toast.fall(message)
  }
  return(res)
})
//注册组件库
import Vant from 'vant';
Vue.use(Vant);
//引入组件样式文件
import 'vant/lib/index.css';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
