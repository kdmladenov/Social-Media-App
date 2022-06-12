import express, { Request, Response } from 'express';

import usersServices from '../services/users-services.js';

import usersData from '../data/users-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import validateFile from '../middleware/validate-file.js';
import uploadAvatar from '../middleware/upload-avatar.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import createUserSchema from '../validator/create-user-schema.js';
import updateUserSchema from '../validator/update-user-schema.js';
import updatePasswordSchema from '../validator/update-password-schema.js';
import forgottenPasswordSchema from '../validator/forgotten-password-schema.js';
import resetPasswordSchema from '../validator/reset-password-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';

import rolesEnum from '../constants/roles.enum.js';
import { paging } from '../constants/constants.js';
import errors from '../constants/service-errors.js';
import RequestQuery from '../models/RequestQuery.js';

const usersController = express.Router();

usersController
  // OK
  // @desc Register new user
  // @route POST /users
  // @access Public - guest
  .post(
    '/',
    validateBody('user', createUserSchema),
    errorHandler(async (req: Request, res: Response) => {
      const user = req.body;

      const { error, result } = await usersServices.createUser(usersData)(user);

      if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'User with same email already exists.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // TODO
  // @desc Get all users
  // @route GET /users
  // @access Public - Logged users only
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { role } = req.user;
      const { search = '', sort = 'sort=user_id asc' } = req.query;
      let { pageSize = paging.DEFAULT_USERS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_USERS_PAGESIZE) pageSize = paging.MAX_USERS_PAGESIZE;
      if (+pageSize < paging.MIN_USERS_PAGESIZE) pageSize = paging.MIN_USERS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const result = await usersServices.getAllUsers(usersData)(
        search,
        sort,
        +page,
        +pageSize,
        role
      );

      res.status(200).send(result);
    })
  )
  // OK
  // @desc Get user by ID
  // @route GET /users/:userId
  // @access Public - only basic info
  // @access Private - Admin or Profile Owner - full info

  .get(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const { error, result } = await usersServices.getUser(usersData)(
        +userId,
        isProfileOwner,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // OK
  // @desc EDIT user data
  // @route PUT /users/:id
  // @access Private - Admin(edit any user) or User Owner(edit itself irrelevant of the userId entered)
  .put(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    validateBody('user', updateUserSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      // const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const { userId } = req.params;

      const update = req.body;

      const { error, result } = await usersServices.update(usersData)(update, +userId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'User with same email already exists.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // OK
  // @desc DELETE user
  // @route DELETE /users/:id
  // @access Private - Admin(delete any user) or User Owner(delete itself irrelevant of the userId entered)
  .delete(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      // case admin-delete every user, case: basic user - delete only itself
      const deletedUserId = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await usersServices.deleteUser(usersData)(+deletedUserId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${deletedUserId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc Restore DELETED user
  // @route PATCH /users/:id
  // @access Private - Admin(restore any deleted user). User Owner cannot restore itself!
  .patch(
    '/:userId/restore',
    authMiddleware,
    loggedUserGuard,
    // Admins only
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.params;

      const { error, result } = await usersServices.restoreUser(usersData)(+userId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc Change password
  // @route GET /users/:userId/change-password',
  // @access Private - logged user
  .patch(
    '/:userId/change-password',
    authMiddleware,
    loggedUserGuard,
    validateBody('user', updatePasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;
      const passwordData = req.body;

      const { error, result } = await usersServices.changePassword(usersData)(
        passwordData,
        +id,
        role
      );

      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: 'The request was invalid. Passwords do not match.'
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // Forgotten password with mail password reset
  .post(
    '/forgotten-password',
    validateBody('user', forgottenPasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { email } = req.body;

      const { error, result } = await usersServices.forgottenPassword(usersData)(email);
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `A user with email ${email} is not found`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // Reset password
  .post(
    '/reset-password/:userId/:token',
    validateBody('user', resetPasswordSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { password, reenteredPassword } = req.body;
      const { userId, token } = req.params;

      const { error, result } = await usersServices.resetPassword(usersData)(
        password,
        reenteredPassword,
        +userId,
        token
      );
      if (error === errors.BAD_REQUEST) {
        res.status(400).send({
          message: 'The request was invalid. Passwords do not match or the token has been changed.'
        });
      } else if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${userId} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc UPLOAD user's avatar
  // @route POST /users/images/upload
  // @access Private - Admin only
  .post(
    '/avatars/upload',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    uploadAvatar.single('avatar'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { path } = req.file;

      res.status(201).send(path.replace(/\\/g, '/'));
    })
  )
  // @desc ADD user's avatar
  // @route POST /users/:userId/image
  // @access Private - Admin or User Owner(change user avatar irrelevant of the userId entered)
  .post(
    '/:userId/avatars',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // validateBody('userImage', addUserImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      const { imageUrl } = req.body;

      const userId = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await usersServices.addUserAvatar(usersData)(+userId, imageUrl);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The user is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // @desc DELETE user's avatar
  // @route DELETE /users/:userId/avatar
  // @access Private - Admin or User Owner(change user avatar irrelevant of the userId entered)
  .delete(
    '/:userId/avatars',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      const id = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await usersServices.deleteUserAvatar(usersData)(+id);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default usersController;
