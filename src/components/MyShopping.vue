<template>
  <div class=wrapper>
    <Header/>
    <PopUp ref="popup" type="success"/>
    <div class="products-container">
      <template v-for="(item, index) in products" >
        <Product
          :key="index"
          typeList="my-shopping"
          :productName="item.productName"
          :description="item.description"
          :amount="item.amount"
          :price="item.price"
          :publisher="item.seller"
          :buyer="item.buyer"
          :salesDate="item.salesDate"
          :totalPrice="item.totalPrice"
          :randomImage="Math.floor((Math.random()*100+1) + 1000)"
          :index="index"
          :currentUser="currentUser"
          />
      </template>
      <span v-if="errorEmpty">{{errorEmpty}}</span>
    </div>
  </div>
</template>

<script>
import PopUp from './popUp.vue';
import Product from './Product.vue';
import storage from '../storage';
import Header from './Header.vue';
import {SIGNED, PRODUCT_CREATED, PRODUCT_BOUGHT, NO_ELEMENTS_USER} from '../utils/messages.js';

export default {
  name: "Home",
  components: {
    PopUp,
    Header,
    Product,
  },
  data(){
    console.log(storage.state.products, storage.state);
    return {
      currentUser: storage.state.currentUser,
      products: storage.state.products ? storage.state.products.filter((product) => {
        return product.buyer && product.buyer.email === storage.state.currentUser.email;
        }) : [],
      errorEmpty: '',

    }
  },
  mounted(){
    storage.dispatch('getUser');
    this.errorEmpty = this.products.length === 0 ? NO_ELEMENTS_USER : "";
    if(this.$route.params.bought){
    console.log(this.$route.params,this.$refs,this.products);
      this.$refs.popup.message = PRODUCT_BOUGHT;
    }
  },
}
</script>

<style lang="scss">
  .wrapper{
    overflow: hidden;
    width: 100%;
  }
  .products-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: flex-start;
    overflow-y: scroll;
    margin-top: 10vh;
    height: 90vh;
    padding: 2.5% 1vw 0;
  }
</style>