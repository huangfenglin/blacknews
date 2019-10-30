<template>
  <div>
    <homeHeader></homeHeader>
    <van-tabs v-model="activeTab">
      <van-tab
        v-for="(tabItem,index) in tabList"
        :key="index"
        :title="tabItem.name"
      >
<!-- 内容部分 -->
      <!-- <div v-for="(post,index) in tabItem.posts" :key="index">
        {{post.title}}
      </div> -->
      <post :post="post" v-for="(post,index) in tabItem.posts" :key="index"></post>
      </van-tab>
      
    </van-tabs>
  </div>
</template>

<script>
import homeHeader from "../components/homeHeader";
import post from "../components/post";

export default {
  components: {
    homeHeader,
    post
  },
  data() {
    return {
      tabList: [],
      // activeTab控制当前显示选项
      // 如果有登陆的话,第一个分类是关注,头条的 index == 1
      // 如果没登录第一个分类就是头条,它的 index == 0
      // 获取 token 就可以判断有没有登陆,设置一个默认激活的当前分类
      activeTab: localStorage.getItem("token") ? 1 : 0
    };
  },
  methods: {
    initTabList() {
      // 挂载完毕的钩子函数
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        // es6 写法
        const { data } = res.data;
        // console.log(data);
        // 给每个分类对象添加数组存放文章列表
        data.forEach(e=>{
          e.posts = []
        });
        // 将获取的数据放到我们的data 当中
        this.tabList = data;
        // 获取完了 tab 数据, 马上使用默认 tab (头条) 获取文章列表数据
        this.getTabPosts(this.activeTab)
      });
    },
    // 获取文章分类的方法
    getTabPosts(tabIndex){
      
      // 通过传入的标签索引获取到对应的文章列表的栏目id
      const categoryId = this.tabList[tabIndex].id
      // console.log(categoryId);
      
      // 发送ajax请求获取文章列表数据
      this.$axios({
        url: '/post',
        method: 'get',
        params: {
          category: categoryId
        }
      }).then(res=>{
        // console.log(res);
        const {data} = res.data;
        // console.log(data);
        console.log(res);
        
        this.tabList[tabIndex].posts = data

      })
      
    }
  },
  watch: {
    activeTab (newActiveTab) {
      // console.log(newActiveTab);
      if(this.tabList[newActiveTab].posts.length == 0) {
        this.getTabPosts(newActiveTab)
      }
    }
  },
  mounted() {
    this.initTabList();
  }
};
</script>

<style lang="less" scoped>
</style>