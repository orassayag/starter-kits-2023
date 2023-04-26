import DataUtils from '../utils/data.utils.js';
import userSchema from '../schemas/user.schema.js';
import CustomError from '../custom/error.custom.js';

class UsersModel {
  constructor() {
    // Simulate the user's model from the database.
    this.users = [];
  }

  /**
    * Validate user existence.
    *
    * This function gets a user Id and searches it in the database. If not found,
    * throw an 404 error.
    * @param {integer} id - The user Id to search for.
    * @return {Promise<object>}
    */
  static async validateUserExistence(id) {
    // Check if the user exists in the database.
    const result = this.users.filter((user) => user.id === id);
    if (!result || !result.length) {
      throw new CustomError({ message: `User with Id ${id} was not found`, status: 404 });
    }
    return result[0];
  }

  /**
    * Validate email existence.
    *
    * This function gets a user Id and an email address and searches it in the database.
    * If found and it's related to a different user Id (In case of update) - Throw an error.
    * @param {integer} id - The user Id to compare in case the email exists in the database.
    * @param {string} email - The email address to search for.
    * @return {Promise<void>}
    */
  static async validateEmailExistence(id, email) {
    // Check if the user does not exist already with this email address.
    const result = this.users.find((user) => user.email === email.trim().toLowerCase());
    if (result && result.id && result.id !== id) {
      throw new CustomError({ message: `User with the email ${email} already exists in the database` });
    }
  }

  /**
    * Initiate.
    *
    * Initiate all the users. Only for simulating connection to the database.
    * @param {array<object>} users
    * @return {void}
    */
  static initiate(users) {
    this.users = users.map((DataUtils.selectProperties(userSchema)));
  }

  /**
    * Get users.
    *
    * This function get request query that contains all the filters to sort and filter the
    * users and returns the relevant users.
    * @param {object} query - An object that contains the relevant parameters, like
    * sortBy, sortOrder, pagerNumber, etc to return the relevant data.
    * @return {Promise<array<object>>}
    */
  static get(query) {
    return DataUtils.prepareData({ data: this.users, ...query });
  }

  /**
    * Get an existing user.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains the user Id to search and return the user by the given Id.
    * @param {integer} id - The user Id.
    * @return {Promise<object>}
    */
  static async getById(id) {
    // Check if the user exists in the database.
    return this.validateUserExistence(id);
  }

  /**
    * Create a new user.
    *
    * This function gets all the server built in parameters, and passes the request body that
    * contains all the user details to create a new user in the database and return it.
    * @param {object} data - The user object to create into the database.
    * @return {Promise<object>}
    */
  static async create(data) {
    // Check if a user does not exist already with this email address.
    const email = data.email.trim().toLowerCase();
    await this.validateEmailExistence(data.id, email);
    // Create the new Id of the user (Simulation of database).
    const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    const newUser = { id: newId, email, ...data };
    // Add the user to the database.
    this.users = [...this.users, newUser];
    // Fetch the user back.
    return newUser;
  }

  /**
    * Update an existing user.
    *
    * This function gets all the server built in parameters, and passes the query user Id
    * and the request body that contains all the user details to update an existing user in
    * the database and return it.
    * @param {object} id - The user Id to fetch the user and update it into the database.
    * @param {object} data - The user object to update to the database.
    * @return {Promise<object>}
    */
  static async update(id, data) {
    // Check if the user exists in the database.
    const currentUser = await this.validateUserExistence(id);
    // Check if the user does not exist already with this email address.
    const email = data.email.trim().toLowerCase();
    await this.validateEmailExistence(currentUser.id, email);
    // Update the user in the database.
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...data };
      }
      return user;
    });
    // Fetch the user back.
    return this.validateUserExistence(id);
  }

  /**
    * Delete an existing user.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains the user Id to search and return the user by the given Id.
    * @param {integer} id - The user Id.
    * @return {Promise<object>}
    */
  static async remove(id) {
    // Check if the user exists in the database.
    const removeUser = await this.validateUserExistence(id);
    // Delete the user from the database.
    this.users = this.users.filter((d) => d.id !== id);
    // Fetch the user back.
    return removeUser;
  }
}

export default UsersModel;
