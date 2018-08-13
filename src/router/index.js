import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import SellerInfo from '@/components/seller_info/seller_info'

Vue.use(Router)

export default new Router({
  linkActiveClass : 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller_info',
      component: SellerInfo
    }
  ]
})
