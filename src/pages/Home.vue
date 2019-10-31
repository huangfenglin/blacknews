<template>
  <div>
    <homeHeader></homeHeader>
    <van-tabs v-model="activeTab" sticky swipeable>
      <van-tab v-for="(tabItem,index) in tabList" :key="index" :title="tabItem.name">
        <!-- v-model 双项绑定一个值,标注当前页面是否在加载
        load 是一个到底部就会触发的事件,可以绑定一个自定义函数,在里面写读取新数据的逻辑
          finished 一个布尔值,标注当前列表是否已经到底,如果数据库里面的数据都被取完了 , 这个数值就是true,这个列表再也不会触发到底部加载的函数,每个分类单独记录
         -->
        <van-list v-model="loading" :finished="tabItem.finished" finished-text="没有更多了" @load="loadMorePost"                :immediate-check="false"
>
          <!-- 内容部分 -->
          <!-- <div v-for="(post,index) in tabItem.posts" :key="index">
        {{post.title}}
          </div>-->
          <post :post="post" v-for="(post,index) in tabItem.posts" :key="index"></post>
        </van-list> 


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
      activeTab: localStorage.getItem("token") ? 1 : 0,
      pageSize: 6,
      loading: false
    };
  },
  methods: {
    initTabList() {
      // 挂载完毕的钩子函数
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        const { data } = res.data;
        console.log(data);
        
        data.forEach(e => {
          // 给每个分类对象添加数组存放文章列表
          e.posts = [];
          // 记录当前分类获取第几页的数据,默认都是1
          e.currentPage = 1;
          // 当数据获取完的时候改为true就不再获取数据
          e.finished = false
        });
        // 将获取的数据放到我们的data 当中
        this.tabList = data;
        // 获取完了 tab 数据, 马上使用默认 tab (头条) 获取文章列表数据
        this.getTabPosts(this.activeTab);
      });
    },

    // 页面滑到底部的事件
    loadMorePost(){
      // console.log('触发了加载函数')
      // 拉到文章底部触发函数页码+1,发送ajax请求重新获取数据  
      this.tabList[this.activeTab].currentPage++
      this.getTabPosts(this.activeTab);

    },

    // 获取文章数据的方法
    getTabPosts(tabIndex) {
      // 通过传入的标签索引获取到对应的文章列表的栏目id
      const categoryId = this.tabList[tabIndex].id;
      // console.log(categoryId);

      // 发送ajax请求获取文章列表数据
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          category: categoryId,
          pageSize: this.pageSize,
          pageIndex: this.tabList[tabIndex].currentPage
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        console.log(data);
        // 存放文章数据的数组一开始就空数组
        const newData = [...this.tabList[tabIndex].posts, ...data];

        this.tabList[tabIndex].posts = newData

        // 判断数据库里面的数据如果<pageSize的话则说明已经到最后一页了就停止加载
        if(data.length < this.pageSize) {
          setTimeout(() => {
          this.tabList[tabIndex].finished = true;
          this.loading = false;
          }, 1000);
        }

      });
    }
  },
  watch: {
    activeTab(newActiveTab) {
      // console.log(newActiveTab);
      if (this.tabList[newActiveTab].posts.length == 0) {
        this.getTabPosts(newActiveTab);
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