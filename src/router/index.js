import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/users/Users'
import Goods from '@/components/goods/Goods'
import Brands from '@/components/goods/Brands'
import Orders from '@/components/orders/Orders'
import Report from '@/components/report/Report'

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
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/goods', component: Goods },
      { path: '/brands', component: Brands },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Report }
    ]
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
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })
export default router
