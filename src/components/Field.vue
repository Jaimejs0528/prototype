<template>
  <div class="container-field">
    <label :for="name" class="label-field">{{name}}</label>
    <input v-if="type !== 'textarea'" :class="`input-field ${errorMessage ? 'error' : ''}`" :type="type" :name="name" :placeholder="placeholder" v-on:keyup="validateInput" v-model="inputField">
    <textarea v-if="type === 'textarea'" :class="`input-field ${errorMessage ? 'error' : ''}`" e cols=45 rows=5 :name="name" :placeholder="placeholder" v-on:keyup="validateInput" v-model="inputField"></textarea>
    <p class="error-message" v-if="errorMessage">{{errorMessage}}</p>
  </div>
</template>

<script>
import {validateFieldByType} from '../utils/tools'

export default {
  name: 'Field',
  props: {
    type: {
      required: true,
      type: String,
      default: "text"
    },
    name: {
      required: true,
      type: String,
      default: "This field needs a name =("
    },
    placeholder: {
      required: true,
      type: String,
      default: "Type your data"
    },
    disabledValidation: {
      required: false,
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      errorMessage: null,
      inputField: "",
    }
  },
  methods: {
    validateInput(event){
      if (!this.disabledValidation) this.errorMessage = validateFieldByType(this.type,this.inputField)
    }
  }
}
</script>

<style lang="scss">
  .container-field{
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    align-items: flex-start;
    min-height: 75px;
    width: 100%;
  }
  
  .input-field{
    padding: 0.3rem;
    border-radius: 7px;
    border:2px solid #38b6ff;
    width: 100%;
  }
  
  .label-field{
    font-weight: 600;
    letter-spacing: 1px;
    padding-bottom: 0.3rem;
  }

  textarea{
    resize: none;
    border:2px solid #38b6ff;
  }

  .error-message{
    font-size: 0.73rem;
    margin: 0.3rem 0 0.6rem 0.2rem;
    color: #b80303;
  }

  .error{
    color: #b80303;
    outline: #b80303;
    border:2px solid #d15c5c;
  }
</style>