import express, { Request, Response } from 'express';

import imagesServices from '../services/images-services.js';

import postsData from '../data/posts-data.js';
import imagesData from '../data/images-data.js';

import validateFile from '../middleware/validate-file.js';
import uploadAvatar from '../middleware/upload-avatar.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import uploadFileSchema from '../validator/upload-file-schema.js';

import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import usersServices from '../services/users-services.js';
import usersData from '../data/users-data.js';

const imagesController = express.Router();

imagesController
  // @desc UPLOAD post's image
  // @route POST /posts/images/upload
  // @access Private - Admin only
  .post(
    '/posts/upload',
    authMiddleware,
    loggedUserGuard,
    uploadImage.single('image'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { path } = req.file;

      res.status(201).send(path.replace(/\\/g, '/'));
    })
  )
  // @desc ADD post's image
  // @route POST /posts/:postId/image
  // @access Private - logged user only
  .post(
    '/:postId/posts',
    authMiddleware,
    loggedUserGuard,
    // validateBody('postImage', addPostImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { image } = req.body;
      const { error, result } = await imagesServices.addPostImage(imagesData, postsData)(
        +postId,
        image
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // @desc GET ALL post's images
  
  // @route GET /posts/:postId/image
  // @access Public
  .get(
    '/:postId/images',
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;

      const { error, postImages } = await imagesServices.getAllPostImages(imagesData)(+postId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(200).send(postImages);
      }
    })
  )
  // @desc DELETE post image
  // @route DELETE /posts/:postImageId/images
  // @access Private - Admin only
  .delete(
    '/posts/:postId/:imageId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { postId, imageId } = req.params;
      const { error, deletedImage } = await imagesServices.deletePostImage(imagesData)(
        +postId,
        +imageId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A post image with this id is not found!'
        });
      } else {
        res.status(200).send(deletedImage);
      }
    })
  )// @desc UPLOAD user's avatar
  // @route POST /users/avatars/upload
  // @access Private - Admin only
  .post(
    '/avatars/upload',
    authMiddleware,
    loggedUserGuard,
    uploadAvatar.single('avatar'),
    validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { path } = req.file;

      const { image } = await imagesServices.uploadImage(imagesData)(
        path.replace(/\\/g, '/')
      );

      console.log(image, 'imgctrl');

      res.status(201).send(image);
    })
  )
  // @desc ADD user's avatar
  // @route POST /users/:userId/image
  // @access Private - Admin or User Owner(change user avatar irrelevant of the userId entered)
  .post(
    '/:userId/avatars',
    authMiddleware,
    loggedUserGuard,
    // validateBody('userImage', addUserImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      const { imageUrl } = req.body;

      const userId = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await imagesServices.addUserAvatar(usersData)(+userId, imageUrl);

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

      const { error, result } = await imagesServices.deleteUserAvatar(usersData)(+id);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${id} is not found.`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default imagesController;
