import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/Register.vue'

Vue.use(Router)

const routes =[
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

export default new Router({
  routes,
  mode:'history'
})
