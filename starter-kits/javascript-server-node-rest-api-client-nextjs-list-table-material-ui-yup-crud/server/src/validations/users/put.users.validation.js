import Joi from 'joi';
import userId from './base/user.id.validation.js';
import userBody from './base/user.body.validation.js';

export default {
  params: Joi.object({ ...userId }),
  body: Joi.object({ ...userBody }),
};
