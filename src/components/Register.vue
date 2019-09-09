<template>
  <div class="register-container">
    <PopUp ref="popup" type="error"/>
    <h1 class="title">Registro de Usuarios</h1>
    <form>
      <Field ref="email" name="Correo electronico" type="email" placeholder="Digita tu correo electronico"/>
      <Field ref="name" name="Nombre" type="text" placeholder="Digita tu nombre"/>
      <Field ref="password" name="Contraseña" type="password" placeholder="Digita tu contraseña"/>
      <Field ref="passwordConfirm" name="Confirmación de contraseña" type="password" placeholder="Confirma la contraseña"/>
      <router-link tag="p" to="/login">
        ¿Ya tienes una cuenta? 
        <a>Inicia sesión</a>
      </router-link>
      <ActionButton v-on:callAction="registerAction" action="register" type="submit" actionName="Crear Cuenta"/>
    </form>
  </div>
</template>

<script>
import Field from './Field.vue';
import { EMPTY_FIELDS,NO_MATCH_PASSWORDS } from '../utils/messages.js'
import {validatePasswordConfirmation, validateEmptyFields, ExistErrorFields} from '../utils/tools'
import ActionButton from './actionButton.vue';
import storage from '../storage';
import PopUp from './popUp.vue';
import { constants } from 'crypto';

export default {
  name: "Register",
  components: {
    Field,
    ActionButton,
    PopUp,
  },
  methods: {
    registerAction(action) {
      if(action === "register") {
        const {email,name,password,passwordConfirm,popup} = this.$refs;
        if (validateEmptyFields([email.inputField, name.inputField, password.inputField, passwordConfirm.inputField])) {
          popup.message = EMPTY_FIELDS;
          return;
        }
        if (!validatePasswordConfirmation(password.inputField, passwordConfirm.inputField)) {
          popup.message = NO_MATCH_PASSWORDS;
          return;
        }
        if (ExistErrorFields([email.errorMessage,name.errorMessage,password.errorMessage,password.errorMessage])) return;
        const user = {
          email: email.inputField,
          name: name.inputField,
          password: password.inputField
        }
        storage.dispatch('registerNewUser',user);
        if(storage.state.registerError){
          popup.message = storage.state.registerError;
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .register-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f0f8ff;
    border: 3px solid #38b6ff;
    border-radius: 15px;
    width: 45vw;
    height: 70vh;
  }
  .title{
    margin-bottom: 3rem;
  }
</style>