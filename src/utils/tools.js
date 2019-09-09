/* eslint-disable no-useless-escape */
import {INVALID_EMAIL,EMPTY_VALUE} from './messages';

export const validateFieldByType = (type, inputValue) => {
  switch (type) {
    case "email":
      if (inputValue) {
        return /[\w\.-]+@{1}(\w+\.{1}\w{2,})+$/.test(inputValue) ? "" : INVALID_EMAIL
      }
      return EMPTY_VALUE;
    case "password":
      return inputValue ? "" : EMPTY_VALUE;
    default:
      return inputValue ? "" : EMPTY_VALUE;
  }
}

export const validatePasswordConfirmation = (pass, passConfirm) => {
  return pass && passConfirm && pass === passConfirm;
}

export const validateEmptyFields = (fields) => {
  let someEmpty= false;
  fields.forEach((field) => {
    if (!field){
      someEmpty = true;
      return;
    }
  });
  return someEmpty;
}

export const ExistErrorFields = (errors) => {
  let existErrors= false;
  errors.forEach((error) => {
    if (error){
      existErrors = true;
      return;
    }
  });
  return existErrors;
}

export const isValidNumber = (number) => isNaN(parseInt(number));

export const dateFormatter = (date = new Date()) => `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

export const getTotalSale = (amount, price) => {
  const intAmount = parseInt(amount);
  const intPrice = parseInt(price);
  if(isNaN(intAmount)|| isNaN(intPrice)) return 0;
  return Math.abs(intAmount) * Math.abs(intPrice);
}

export default {
  validateFieldByType,
  validatePasswordConfirmation,
  isValidNumber,
  getTotalSale,
  dateFormatter,
  validateEmptyFields,
}
