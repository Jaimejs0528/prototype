<template>
  <div class="login-container">
    <PopUp ref="popup" type="error"/>
    <PopUp ref="popupSuccess" type="success"/>
    <img src="../assets/logo.png" alt="quedados-logo">
    <form>
      <Field ref="email" name="Correo electronico" type="email" placeholder="Digita tu correo electrónico"/>
      <Field ref="password" name="Contraseña" type="password" placeholder="Digita tu contraseña"/>
      <router-link tag="p" to="/register">
        ¿No tienes cuenta aun? 
        <a>Crea tu cuenta Aquí</a>
      </router-link>
      <ActionButton v-on:callAction="loginAction" action="login" type="submit" actionName="Iniciar sesión"/>
    </form>
  </div>
</template>

<script>
import Field from './Field.vue';
import PopUp from './popUp.vue';
import { EMPTY_FIELDS, LOGOUT, CREATED } from '../utils/messages.js'
import ActionButton from './actionButton.vue';
import storage from '../storage';

export default {
  name: "Login",
  components: {
    Field,
    ActionButton,
    PopUp,
  },
  mounted(){
    if(this.$route.params.logout){
      this.$refs.popupSuccess.message = LOGOUT;
    }
    if(this.$route.params.created){
      this.$refs.popupSuccess.message = CREATED;
    }
  },
  methods:{
    loginAction(action){
      const user = {
        email: this.$refs.email.inputField,
        password: this.$refs.password.inputField
      }
      if(user.email === '' || user.password === ''){
        this.$refs.popup.message = EMPTY_FIELDS;
        return;
      }
      storage.dispatch('login',user);
      this.$refs.popup.message = storage.state.loginError;
    }
  }
}
</script>

<style lang="scss">
  .login-container{
    display: flex;
    background: #f0f8ff;
    border: 3px solid #38b6ff;
    border-radius: 15px;
    width: 45vw;
    height: 70vh;;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
      height: 240px;
      position: relative;
      top: -60px;
    }

    form{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>