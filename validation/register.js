const validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : '';
  data.email = !_.isEmpty(data.email) ? data.email : '';
  data.password = !_.isEmpty(data.password) ? data.password : '';
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 cahracters';
  }
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required ';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required ';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid ';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required ';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      'Password should be atleast 6 characters and max is 30 characters ';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Password2 field is required ';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
