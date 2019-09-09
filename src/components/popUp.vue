<template>
  <div v-if="isVisible" :class="`popup ${type}`">
    <strong>{{type}}</strong>
    <p>{{message}}</p>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
import { constants } from 'crypto';
import { timeout } from 'q';
export default {
  name: "PopUp",
  props:{
    type: String,
  },
  data(){
    return {
      isVisible: false,
      message: '',
      timeOut: null,
    }
  },
  methods: {
    hidePopUp(){
      if(this.timeOut) clearTimeout(this.timeout);
      this.timeOut = setTimeout(() => {
        this.isVisible = false;
        this.message = "";
        }, 2500);
    }
  },
  watch:{
    message(value){
      if(value){
        this.isVisible = true;
        this.hidePopUp();
      }
    }
  }
}
</script>

<style lang="scss">

@keyframes hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100%{
    opacity: 0;
    transform: scale(0);
  }
}

.popup{
    position: absolute;
    padding: 0.5rem;
    border: 1px solid;
    border-radius: 10px;
    user-select: none;
    outline: none;
    max-width: 320px;
    max-width: 200px;
    top: 12vh;
    z-index: 5;
    left: 82vw;
    animation: hide 0.3s linear 2.2s forwards;
    
    &.error{
      background: #ff949443;
      color:#FF9494;
    }

    &.success{
      background: #6cc07043;
      color:#6cc070;
    }
}
</style>