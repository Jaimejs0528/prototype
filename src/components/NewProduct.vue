<template>
  <div>
    <Header/>
    <PopUp ref="popup" type="error"/>
    <h2>Nuevo Producto</h2>
    <form>
      <Field ref="product" name="Producto" type="text" placeholder="Cual es tu producto"/>
      <Field ref="description" name="Descripción del producto" type="textarea" placeholder="Describe tu producto"/>
      <Field ref="amount" name="Cantidad" type="number" placeholder="Cuantas unidades venderas"/>
      <Field ref="price" name="Precio Unidad" type="number" placeholder="Cual es el precio por unidad"/>
      <ActionButton v-on:callAction="newProductAction" action="register" type="submit" actionName="Publicar Producto"/>
    </form>
  </div>
</template>

<script>
import ActionButton from './actionButton.vue';
import Field from './Field.vue';
import PopUp from './popUp.vue';
import storage from '../storage';
import Header from './Header.vue';
import {validateEmptyFields,getTotalSale,dateFormatter} from '../utils/tools'
import {EMPTY_FIELDS} from '../utils/messages';

export default {
  name: "NewProduct",
  components: {
    Field,
    ActionButton,
    Header,
    PopUp
  },
  methods: {
    newProductAction(action) {
      const {product,description,amount,price,popup} = this.$refs;
        if (validateEmptyFields([product.inputField, description.inputField, amount.inputField, price.inputField])) {
          popup.message = EMPTY_FIELDS;
          return;
        }
        storage.dispatch('getUser');
        const newProduct = {
          productName: product.inputField,
          description: description.inputField,
          amount: amount.inputField,
          price:price.inputField,
          totalPrice: getTotalSale(amount.inputField,price.inputField),
          seller: (storage.state.currentUser) ? storage.state.currentUser : {name: "Anonimo", email: "Anonimo@anonimo.com"},
          salesDate: dateFormatter(new Date()),
          buyer: null,
          buyDate: null,
        }
        storage.dispatch('publishNewProduct',newProduct);
    }
  }
}
</script>

<style>

</style>