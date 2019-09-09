import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {USER_NOT_FOUND, WRONG_PASSWORD,ALREADY_EXISTENT} from '../utils/messages'
import {dateFormatter} from '../utils/tools'

Vue.use(Vuex);

const userField = 'userEmail';

const storage = new Vuex.Store({
  state:{
    users: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {},
    loginError: null,
    registerError: null,
    products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
    currentUser: null,
    loginState: false,
  },
  mutations: {
    signIn(state,user){
      if (!state.users.hasOwnProperty(user.email)){
        state.loginError = USER_NOT_FOUND;
        return;
      }
      if(user.password !== state.users[user.email].password){
        state.loginError = WRONG_PASSWORD;
        return;
      }
      state.loginState = true;
      state.loginError =  null;
    },
    logout(state){
      state.loginState = false;
      state.loginError = null;
    },
    getCurrentUser(state){
      if (!localStorage.getItem(userField)){
        state.currentUser = null;
        return;
      }
      state.currentUser = state.users[localStorage.getItem(userField)];
    },
    registerUser(state, user){
      state.users[user.email] = user;
      localStorage.setItem('users',JSON.stringify(state.users));
    },
    publishProduct(state, product){
      state.products.push(product);
      localStorage.setItem('products',JSON.stringify(state.products));
    },
    buyProduct(state, index){
      const product = state.products[index];
      product.buyer = state.currentUser;
      product.buyDate = dateFormatter(new Date());
      state.products[index] = product;
      localStorage.setItem('products',JSON.stringify(state.products));
    }
  },
  actions:{
    login({commit},user){
      commit('signIn',user);
      if(storage.state.loginError){
        return;
      }
      localStorage.setItem(userField,user.email);
      router.push({
        name: 'Home',
        params: {
          'firstSignIn': true,
        }
      });
    },
    logout({commit}){
      commit('logout');
      localStorage.removeItem(userField);
      commit('getCurrentUser');
      router.push({
        name: 'Login',
        params:{
          logout: true
        }
      });
    },
    getUser({commit}){
      commit('getCurrentUser');
    },
    registerNewUser({commit},user){
      if (storage.state.users.hasOwnProperty(user.email)) {
        storage.state.registerError = ALREADY_EXISTENT;
        return;
      }
      commit('registerUser',user);
      router.push({
        name: 'Login',
        params:{
          created: true
        }
      });
    },
    publishNewProduct({commit}, product){
      commit('publishProduct',product);
      router.push({
        name: 'Home',
        params:{
          created: true
        }
      });
    },
    buyNewProduct({commit}, index){
      commit('buyProduct',index);
      router.push({
        name: 'MyShopping',
        params:{
          bought: true
        }
      });
    },
  }
});

export default storage;
