import Joi from 'joi';
import userBody from './base/user.body.validation.js';

export default Joi.object({ ...userBody });
