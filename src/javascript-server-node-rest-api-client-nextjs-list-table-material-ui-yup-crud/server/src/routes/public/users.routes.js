import express from 'express';
import JoiMiddleware from '../../middlewares/joi.middleware.js';
import UsersController from '../../controllers/users.controller.js';
import get from '../../validations/users/get.users.validation.js';
import getById from '../../validations/users/getById.users.validation.js';
import create from '../../validations/users/post.users.validation.js';
import update from '../../validations/users/put.users.validation.js';
import remove from '../../validations/users/remove.users.validation.js';
import CustomError from '../../custom/error.custom.js';

export default class UsersRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate all the users routes.
    * @return {object}
    */
  static initiate() {
    const router = express.Router();

    /**
      * @swagger
      * /api/users:
      *   get:
      *     tags:
      *       - Users
      *     description: Return array of users using pagination.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: pageNumber
      *         description: The page number. The default is 1.
      *         in: query
      *         schema:
      *           type: integer
      *         default: 1
      *         required: true
      *       - name: pageSize
      *         description: The number of items to return per page. The default is 10.
      *         in: query
      *         schema:
      *           type: integer
      *         default: 10
      *         required: true
      *       - name: sortBy
      *         description: The sort by identifier column. The default is firstName.
      *         in: query
      *         schema:
      *           type: string
      *         default: firstName
      *         required: true
      *       - name: sortOrder
      *         description: The sort order, asc or desc. The default is asc.
      *         in: query
      *         schema:
      *           type: string
      *           enum:
      *             - desc
      *             - asc
      *         default: desc
      *         required: true
      *     responses:
      *       200:
      *         description: An array of users.
      *         schema:
      *           type: array
      *           items:
      *             properties:
      *               id:
      *                 type: integer
      *                 default: 1
      *               firstName:
      *                 type: string
      *                 default: firstName
      *               lastName:
      *                 type: string
      *                 default: lastNameName
      *               age:
      *                 type: integer
      *                 default: 20
      *               email:
      *                 type: string
      *                 default: test@test.com
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       500:
      *         description: Internal server error.
      */
    router.get(
      '/',
      JoiMiddleware.validate({ query: get }),
      UsersController.get,
    );

    /**
      * @swagger
      * /api/users/{id}:
      *   get:
      *     tags:
      *       - Users
      *     description: Return a user by Id.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: id
      *         description: The user's Id.
      *         in: path
      *         required: true
      *         type: integer
      *     responses:
      *       200:
      *         description: The requested user.
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: integer
      *               default: 1
      *             firstName:
      *               type: string
      *               default: firstName
      *             lastName:
      *               type: string
      *               default: lastNameName
      *             age:
      *               type: integer
      *               default: 20
      *             email:
      *               type: string
      *               default: test@test.com
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       404:
      *         description: User not found.
      *       500:
      *         description: Internal server error.
      */
    router.get(
      '/:id',
      JoiMiddleware.validate({ params: getById }),
      UsersController.getById,
    );

    /**
      * @swagger
      * /api/users:
      *   post:
      *     tags:
      *       - Users
      *     description: Create a new user.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: body
      *         in: body
      *         required: true
      *         schema:
      *           type: object
      *           required:
      *             - firstName
      *             - lastName
      *             - email
      *             - age
      *           properties:
      *             firstName:
      *               type: string
      *               default: firstName
      *             lastName:
      *               type: string
      *               default: lastName
      *             age:
      *               type: integer
      *               default: 20
      *             email:
      *               type: string
      *               default: test@test.com
      *     responses:
      *       200:
      *         description: The created user.
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: integer
      *               default: 1
      *             firstName:
      *               type: string
      *               default: firstName
      *             lastName:
      *               type: string
      *               default: lastNameName
      *             age:
      *               type: integer
      *               default: 20
      *             email:
      *               type: string
      *               default: test@test.com
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       409:
      *         description: Duplicate email (User with this email already exists in the database).
      *       500:
      *         description: Internal server error.
      */
    router.post(
      '/',
      JoiMiddleware.validate({ body: create }),
      UsersController.create,
    );

    /**
      * @swagger
      * /api/users/{id}:
      *   put:
      *     tags:
      *       - Users
      *     description: Updating an existing User.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: id
      *         description: The user's Id.
      *         in: path
      *         required: true
      *         type: integer
      *       - name: body
      *         in: body
      *         required: true
      *         schema:
      *           type: object
      *           required:
      *             - firstName
      *             - lastName
      *             - email
      *             - age
      *           properties:
      *             firstName:
      *               type: string
      *               default: firstName
      *             lastName:
      *               type: string
      *               default: lastName
      *             age:
      *               type: integer
      *               default: 20
      *             email:
      *               type: string
      *               default: test@test.com
      *     responses:
      *       200:
      *         description: The updated user.
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: integer
      *               default: 1
      *             firstName:
      *               type: string
      *               default: firstName
      *             lastName:
      *               type: string
      *               default: lastNameName
      *             age:
      *               type: integer
      *               default: 20
      *             email:
      *               type: string
      *               default: test@test.com
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       404:
      *         description: User not found.
      *       409:
      *         description: Duplicate email (User with this email already exists in the database).
      *       500:
      *         description: Internal server error.
      */
    router.put(
      '/:id',
      JoiMiddleware.validate({ body: update.body, params: update.params }),
      UsersController.update,
    );

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     tags:
     *       - Users
     *     description: Delete an existing user.
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: The user's Id.
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: The deleted user.
     *         schema:
     *           type: object
     *           properties:
     *             id:
     *               type: integer
     *               default: 1
     *             firstName:
     *               type: string
     *               default: firstName
     *             lastName:
     *               type: string
     *               default: lastNameName
     *             age:
     *               type: integer
     *               default: 20
     *             email:
     *               type: string
     *               default: test@test.com
     *       404:
     *         description: User not found.
     *       500:
     *         description: Internal server error.
     */
    router.delete(
      '/:id',
      JoiMiddleware.validate({ params: remove }),
      UsersController.remove,
    );
    return router;
  }
}
