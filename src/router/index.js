import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const Home=()=>import('../views/Home.vue');
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Footer from '../views/Footer.vue'
import ShopCar from '../views/ShopCar.vue'
import SearchPage from '../views/SearchPage.vue'



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
    path: '/footer',
    name: 'footer',
    component: Footer
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router