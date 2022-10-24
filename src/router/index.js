import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const Home=()=>import('../views/Home.vue');
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ShopCar from '../views/ShopCar.vue'
import SearchPage from '../views/SearchPage.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import StoreIndex from '../views/StoreIndex.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import SettlementPage from '../views/SettlementPage.vue'




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
  {
    path: '/shop-car',
    name: 'shop-car',
    component: ShopCar
  },
  {
    path: '/search-page',
    name: 'search-page',
    component: SearchPage
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router