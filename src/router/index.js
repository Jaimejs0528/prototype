import Vue from 'vue'
import Router from 'vue-router'

import storage from '../storage'
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import NewProduct from '../components/NewProduct.vue';
import MyShopping from '../components/MyShopping.vue';
import Register from '../components/Register.vue';

Vue.use(Router);

const router = new Router({
  mode:"history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/new-product',
      name: 'NewProduct',
      component: NewProduct,
    },
    {
      path: '/my-shopping',
      name: 'MyShopping',
      component: MyShopping,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ],
});

router.beforeEach((to, from, next) => {
  storage.dispatch('getUser');
  switch(true){
    case /\/$/.test(to.fullPath):
      if(storage.state.currentUser){
        next('/home');
      }else{
        next('/login')
      }
      break;
      case /\/home\/?/i.test(to.fullPath):
      case /\/profile(\/[\w]*)?/i.test(to.fullPath):
      case /\/my-shopping(\/[\w]*)?/i.test(to.fullPath):
      case /\/new-product(\/[\w]*)?/i.test(to.fullPath):
      if(!storage.state.currentUser) return next('/login');
      return next();
    case /\/login\/?/i.test(to.fullPath):
      if(storage.state.currentUser) return next('/home');
      return next();
    case /\/not_found\/?/i.test(to.fullPath):
      return next();
    case /\/register\/?/i.test(to.fullPath):
      return next();
    default :
      next('/not_found');
      break;
  }
});

export default router;