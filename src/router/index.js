import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'
import Ad from '@/components/Ads/Ad'
import NewAd from '@/components/Ads/NewAd'
import AdList from '@/components/Ads/AdList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
  },
  {
    path: '/ad/:id',
    props: true,
    name: 'ad',
    component: Ad
  },
  {
    path: '/new',
    name: 'newAd',
    component: NewAd,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'list',
    component: AdList,
    beforeEnter: AuthGuard
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
