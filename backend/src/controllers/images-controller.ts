import express, { Request, Response } from 'express';

import imagesServices from '../services/images-services.js';

import postsData from '../data/posts-data.js';
import imagesData from '../data/images-data.js';

import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import uploadFileSchema from '../validator/upload-file-schema.js';

import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';

const imagesController = express.Router();

imagesController
  // @desc UPLOAD post's image
  // @route POST /posts/images/upload
  // @access Private - Admin only
  .post(
    '/post/upload',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
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
    '/post/:postId',
    authMiddleware,
    loggedUserGuard,
    // validateBody('postImage', addPostImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { imageUrl } = req.body;
      const { error, result } = await imagesServices.addPostImage(imagesData, postsData)(
        +postId,
        imageUrl
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
  // .get(
  //   '/:postId/images',
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { postId } = req.params;

  //     const { error, result } = await postsServices.getAllPostImages(
  //       postsImagesData,
  //       postsData
  //     )(+postId);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The post is not found.'
  //       });
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // )
  // @desc DELETE post image
  // @route DELETE /posts/:postImageId/images
  // @access Private - Admin only
  .delete(
    '/post/:postId/:imageId',
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
  );

export default imagesController;
