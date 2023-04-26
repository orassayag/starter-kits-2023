import Joi from 'joi';
import userSchema from '../../schemas/user.schema.js';

export default Joi.object({
  pageNumber: Joi.number().integer().min(1).max(10)
    .required(),
  pageSize: Joi.number().integer().min(1).max(100)
    .required(),
  sortBy: Joi.string().valid(...userSchema)
    .required(),
  sortOrder: Joi.string().valid('asc', 'desc')
    .required(),
});
