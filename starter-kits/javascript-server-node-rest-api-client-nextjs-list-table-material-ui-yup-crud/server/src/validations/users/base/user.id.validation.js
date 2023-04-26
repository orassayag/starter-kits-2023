import Joi from 'joi';

export default {
  id: Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER)
    .required(),
};
