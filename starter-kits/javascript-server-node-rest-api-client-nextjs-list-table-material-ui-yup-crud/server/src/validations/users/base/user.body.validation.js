import Joi from 'joi';

export default {
  firstName: Joi.string().min(2).max(100)
    .required(),
  lastName: Joi.string().min(2).max(100)
    .required(),
  age: Joi.number().integer().min(18).max(120)
    .required(),
  email: Joi.string().email()
    .required(),
};
