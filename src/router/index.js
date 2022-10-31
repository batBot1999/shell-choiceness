import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const Home=()=>import('../views/Home.vue');
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// import ShopCar from '../views/ShopCar.vue'
import GoodsSearchPage from '../views/GoodsSearchPage.vue'
import ServiceSearchPage from '../views/ServiceSearchPage.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import StoreIndex from '../views/StoreIndex.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import SettlementPage from '../views/SettlementPage.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'

// 解决vue-router在3.0版本以上重复点报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'home',
    component: Home

  },
  // {
  //   path: '/shop-car',
  //   name: 'shop-car',
  //   component: ShopCar
  // },
  {
    path: '/service-search-page',
    name: 'service-search-page',
    component: ServiceSearchPage
  },
  {
    path: '/goods-search-page',
    name: 'goods-search-page',
    component: GoodsSearchPage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/goods-detail',
    name: 'goods-detail',
    component: GoodsDetail
  },
  {
    path: '/store-index',
    name: 'store-index',
    component: StoreIndex
  },
  {
    path: '/service-detail',
    name: 'service-detail',
    component: ServiceDetail
  },
  {
    path: '/settlement-page',
    name: 'settlement-page',
    component: SettlementPage
  },
  {
    path: '/announcement-detail',
    name: 'announcement-detail',
    component: AnnouncementDetail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router