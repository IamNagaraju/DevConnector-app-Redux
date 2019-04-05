const validator = require('validator');
const _ = require('lodash');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !_.isEmpty(data.school) ? data.school : '';
  data.fieldOfStudy = !_.isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.degree = !_.isEmpty(data.degree) ? data.degree : '';
  data.from = !_.isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required ';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree is invalid ';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From field is required ';
  }

  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study field is required ';
  }

  return {
    errors,
    isValid: _.isEmpty(errors),
  };
};
