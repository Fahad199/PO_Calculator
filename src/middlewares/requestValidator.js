const joi = require('@hapi/joi');
const { ValidationError } = require('./errorHandler');

module.exports.validateRequest = (schema) => async (req, res, next) => {
  if (schema.body) {
    const { error } = joi.object(schema.body).validate(req.body);
    if (error) {
      throw ValidationError('Invalid request body params', error, res);
    }
  }

  if (schema.query) {
    const { error } = joi.object(schema.query).validate(req.query);
    if (error) {
      throw ValidationError('Invalid request query params', error, res);
    }
  }

  await next();
};
