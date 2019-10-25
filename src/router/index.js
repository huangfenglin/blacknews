import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login.vue'

Vue.use(Router)

const routes =[
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default new Router({
  routes,
  mode:'history'
})
