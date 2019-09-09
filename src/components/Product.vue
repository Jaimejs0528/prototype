<template>
  <div class="product-container">
    <img :src="`https://picsum.photos/id/${randomImage}/200/300`" :alt="`product-${productName}`"
      v-on:error="imageFallback">
    <div class="info-container">
      <h2>{{productName}}</h2>
      <p><strong>Detalles: </strong>{{description}}</p>
      <p><strong>Cantidad: </strong>{{amount}}</p>
      <p><strong>Precio: </strong>{{price}}</p>
      <p><strong>Precio total: </strong>{{totalPrice}}</p>
      <p><strong>Publicador: </strong>{{publisher.name}}</p>
      <p><strong>Fecha de Publicación: </strong>{{salesDate}}</p>
      <div v-if="validateUser(typeList)" class="action-container">
        <ActionButton v-on:callAction="buyProduct" action="register"
          type="submit" actionName="Comprar"/>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from './actionButton.vue';
import storage from '../storage';
import { type } from 'os';
export default {
  name: "Product",
  components:{
    ActionButton,
  },
  props: {
    typeList: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    publisher: {
      type: Object,
      required: true,
    },
    buyer: {
      type: Object,
    },
    salesDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    randomImage: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    }
  },
  methods: {
    buyProduct(action){
      storage.dispatch('buyNewProduct',this.index);
    },
    validateUser(typeList){
      if(typeList === "my-shopping"){
        return this.buyer && this.buyer.email !== this.currentUser.email
      }else{
        return this.publisher && this.publisher.email !== this.currentUser.email
      }
    },
    imageFallback(event){
      console.log(event.target);
      event.target.src = 'https://picsum.photos/id/1/200/300';
      console.log(event.target);
    }
  },
  mounted(){
    console.log(this.currentUser);
    storage.dispatch('getUser');
    console.log(this.currentUser);
  }
}
</script>

<style lang=scss>
  .product-container{
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 10px -2px;
    opacity: 0.85;
    margin: 10px;
    height: 350px;
    width: 600px;
    transition: all 0.35s;
    
    &:hover{
      opacity: 1;

      & img{
        clip-path: rect(0px, 0px, 100px, 100px);
      }
    }

    & img{
      object-fit: cover;
      border-radius: 10px 0 0 10px;
    }

  }

  .info-container{
    display: flex;
    position: relative;
    width: 100%;
    padding: 0.8rem;
    flex-direction: column;
  }
  .action-container{
    position: absolute;
    top: 77%;
    left: 65%;
  }
</style>