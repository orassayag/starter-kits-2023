import express from 'express';
import UsersRoutes from './public/users.routes.js';
import CustomError from '../custom/error.custom.js';

export default class IndexPublicRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate the public routes: users.
    * @return {object}
    */
  static initiate() {
    const routes = express();
    routes.use('/users', UsersRoutes.initiate());
    return routes;
  }
}
