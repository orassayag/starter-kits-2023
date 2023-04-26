import UsersModel from '../models/users.model.js';
import CustomError from '../custom/error.custom.js';

class UsersController {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate all the users. Only for simulating connection to the database.
    * @param {array<object>} users
    * @return {void}
    */
  static initiate(users) {
    UsersModel.initiate(users);
  }

  /**
    * Get users.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains all the filters to sort and filter the users and returns the relevant users.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<array<object>>}
    */
  static async get(req, res, next) {
    try {
      const results = await UsersModel.get(req.query);
      return res.status(200).json(results);
    } catch (error) {
      return next(error);
    }
  }

  /**
    * Get an existing user.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains the user Id to search and return the user by the given Id.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async getById(req, res, next) {
    try {
      const result = await UsersModel.getById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
    * Create a new user.
    *
    * This function gets all the server built in parameters, and passes the request body that
    * contains all the user details to create a new user in the database and return it.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async create(req, res, next) {
    try {
      const result = await UsersModel.create(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
    * Update an existing user.
    *
    * This function gets all the server built in parameters, and passes the query user Id
    * and the request body that contains all the user details to create a new user in
    * the database and return it.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async update(req, res, next) {
    try {
      const result = await UsersModel.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
  * Delete an existing user.
  *
  * This function gets all the server built in parameters, and passes the request query that
  * contains the user Id to delete, delete it from the database and return the deleted user
  * by the given Id.
  * @param {object} req - A request object with the body and parameters.
  * @param {object} res - A response object to return JSON.
  * @param {object} next - The next middleware function in the chain.
  * @return {Promise<object>}
  */
  static async remove(req, res, next) {
    try {
      const result = await UsersModel.remove(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export default UsersController;
