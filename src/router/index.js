import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '@/components/Welcome'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }]
  }
]

const router = new VueRouter({
  routes
})

/***
 * 挂载路由导航卫士（拦截器）
 * to 将要访问的路径
 * from 从哪个路径跳转而来
 * next 函数：next()表示放行;next('/login')强制跳转到/login
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
