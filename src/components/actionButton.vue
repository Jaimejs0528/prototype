<template>
  <button v-on:click="callAction" v-on:keyup="callAction" :type="type" :class="className">{{actionName}}</button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    actionName: {
      type: String,
      default: "Submit"
    },
    type: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    callAction(event){
      if (event.type === 'keyup' && event.key === "Enter"){
        this.$emit('callAction',this.action);
        return;
      }
      if(event.type === 'click'){
        this.$emit('callAction',this.action);
      }
      event.preventDefault();
    }
  }
}
</script>

<style lang="scss">
  .button{
    padding: 0.4rem;
    margin: .8rem 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: #2a57a7;
    background: #93b7ff;
    letter-spacing: 1px;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid #FFF;

    &:hover{
      background: #FFF;
    }

    &:active{
      letter-spacing: 2px;
    }
  }

  .sesion-button{
    padding: 0.4rem;
    border-radius: 10px;
    font-weight: 600;
    color: #fff;
    border: none;
    margin-top: 0.4rem;
    background: cornflowerblue;

    &:hover{
      box-shadow: 0 0 15px -5px #2a57a7;  
    }

    &:active{
      box-shadow: 0 0 15px -5px #2a57a7;  
      color: #2a57a7;
    }
  }
</style>