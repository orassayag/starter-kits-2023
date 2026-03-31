import Joi from 'joi';
import userId from './base/user.id.validation.js';

export default Joi.object({ ...userId });
