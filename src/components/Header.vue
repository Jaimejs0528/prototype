<template>
<header class="header-container">
  <img src="../assets/logo.png" height="86px" alt="quedados-logo">
  <nav class="nav-container">
    <ul class="options-container">
      <router-link tag="li" to="/new-product" >
        <a>Publicar un producto</a>
      </router-link>
      <router-link tag="li" to="/home" >
        <a>Ver Publicaciones</a>
      </router-link>
      <router-link tag="li" to="/my-shopping" >
        <a>Mis Compras</a>
      </router-link>
    </ul>
  </nav>
  <div class="user-actions-container">
    <router-link to="/my-shopping" >
      {{currentUser.name.split(" ")[0]}}
    </router-link>
    <ActionButton className="sesion-button" v-on:callAction="logoutAction" type="button" actionName="Cerrar Sesión" action="logout"/>
  </div>
</header>
</template>

<script>
import ActionButton from './actionButton.vue';
import storage from '../storage';

export default {
  name: "Header",
  components: {
    ActionButton,
  },
  methods: {
    logoutAction(action){
      if(action === "logout"){
        storage.dispatch('logout');
      }
    }
  },
  data(){
    return{
      currentUser: storage.state.currentUser,
    }
  },
}
</script>

<style lang="scss">
  .header-container{
    position: fixed;
    top: 0;
    width: 100vw;
    left: 0;
    background: #fff;
    border-bottom: 1px solid #666;
    box-shadow: 0 0 15px 2px #555;
    display: flex;
    justify-content: space-between;
    height: 10vh;
    z-index: 2;

    &>img{
      margin-left: 15px;
    }
  }
  .nav-container{
    width: 80%;
  }
  .options-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    height: 100%;
    width: 100%;

    .router-link-active{
      transform: scale(1);
      opacity: 1;

      &:hover{
        a{
          color: #206ba8;
        }
      }
    }

    a{
      transition: color 0.35s;
      text-decoration: none;
      color: cornflowerblue;
    }

    li{
        font-size: 1.6rem;
        opacity: 0.65;
        letter-spacing: 1px;
        width: 30%;
        font-weight: bold;
        transform: scale(0.99);
        transition: all 0.25s;

        &:hover{
          transform: scale(1);
        }

        &:active{
          opacity: 1;
        }
    }
  }
  .user-actions-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
  }
</style>