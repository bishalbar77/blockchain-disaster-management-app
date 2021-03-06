import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ShoppingCart from './views/ShoppingCart.vue'
import Payments from './views/Payments.vue'
import PayToNGO from './views/PayToNGO.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: ShoppingCart
    },    
    {
      path: '/resources-payment',
      name: 'resources-payment',
      component: PayToNGO
    },    
    {
      path: '/payments',
      name: 'payments',
      component: Payments
    }
  ]
})
