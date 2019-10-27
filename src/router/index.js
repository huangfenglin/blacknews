import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login.vue'
import Register from '@/pages/Register.vue'
import Profile from '@/pages/profile.vue'
import Home from '@/pages/Home.vue'
import EditProfile from '@/pages/EditProfile.vue'
Vue.use(Router)

const routes = [
  // {
  //   path: '',
  //   redirect: '/login'
  // },
  {
    path: '/',
    name: 'homePage',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'loginPage',
    component: Login,
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/register',
    name: 'registerPage',
    component: Register,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/profile',
    name: 'profilePage',
    component: Profile,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/editprofile',
    name: 'editProfilePage',
    component: EditProfile,
    meta: {
      title: '编辑'
    }
  }
]

const router = new Router({
  routes,
  mode: 'history'
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  const token = localStorage.getItem("token");
  if (to.path === '/profile') {
    token? next():next('/login')
  } else {
    next()
  }
})

export default router
