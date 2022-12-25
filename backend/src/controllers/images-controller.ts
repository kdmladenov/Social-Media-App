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
import uploadCover from '../middleware/upload-cover.js';
import validateBody from '../middleware/validate-body.js';
import uploadStory from '../middleware/upload-story.js';
import updatePasswordSchema from '../validator/update-password-schema.js';
import uploadPostImages from '../middleware/upload-post-images.js';
import multer from 'multer';
import addPostImagesSchema from '../validator/add-post-images-schema.js';
import RequestQuery from '../models/RequestQuery.js';
import { GOOGLE_DRIVE_FOLDER_IDS, paging } from '../constants/constants.js';
import { uploadFile } from '../helpers/uploadFile.js';

const imagesController = express.Router();

imagesController
  // @desc UPLOAD post's image
  // @route POST /images/posts/upload
  // @access Private - Admin only
  .post(
    '/posts/upload',
    authMiddleware,
    loggedUserGuard,
    uploadPostImages,
    // validateFile('uploads', uploadFileSchema),
    // errorHandler(
    async (req: Request, res: Response) => {
      // TO DO / Finish backend validation
      // to move to middleware
      // uploadPostImages(req, res, function (err) {
      //   if (err instanceof multer.MulterError) {
      //     // A Multer error occurred when uploading.
      //     res
      //       .status(500)
      //       .send({ error: { message: `Multer uploading error: ${err.message}` } })
      //       .end();
      //     return;
      //   } else if (err) {
      //     // An unknown error occurred when uploading.
      //     if (err.name == 'ExtensionError') {
      //       res
      //         .status(413)
      //         .send({ error: { message: err.message } })
      //         .end();
      //     } else {
      //       res
      //         .status(500)
      //         .send({ error: { message: `unknown uploading error: ${err.message}` } })
      //         .end();
      //     }
      //     return;
      //   }
      //   res.status(200).send(req.files);
      // });
      const { files } = req;
      const uploadedFiles = await Promise.all(
        files?.map(async (file) => await uploadFile(file, GOOGLE_DRIVE_FOLDER_IDS.posts))
      );
      res.status(200).send(uploadedFiles);
    }
  )
  // )
  // @desc ADD post's image
  // @route POST /posts/:postId/image
  // @access Private - logged user only
  .post(
    '/:postId/posts',
    authMiddleware,
    loggedUserGuard,
    validateBody('postImages', addPostImagesSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { images } = req.body;
      const { error, result } = await imagesServices.addPostImages(imagesData, postsData)(
        +postId,
        images
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
  )
  // @desc GET ALL user's images

  // @route GET /images/users/:userId
  // @access Public
  .get(
    '/users/:userId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{ userId: number }, {}, {}, RequestQuery>, res: Response) => {
      const { userId } = req.params;
      const { role } = req.user;
      const { search = '', sort = 'sort=image_id asc' } = req.query;

      let { pageSize = paging.DEFAULT_IMAGES_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_IMAGES_PAGESIZE) pageSize = paging.MAX_IMAGES_PAGESIZE;
      if (+pageSize < paging.MIN_IMAGES_PAGESIZE) pageSize = paging.MIN_IMAGES_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, userImages } = await imagesServices.getAllUserImages(imagesData, usersData)(
        +userId,
        search,
        sort,
        +page,
        +pageSize
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The user is not found.'
        });
      } else {
        res.status(200).send(userImages);
      }
    })
  )
  // @desc UPLOAD user's avatar
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

      const { image } = await imagesServices.uploadImage(imagesData)(path.replace(/\\/g, '/'));

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
  )
  // @desc UPLOAD user's avatar
  // @route POST /users/avatars/upload
  // @access Private - Admin only

  // TODO - ValidateFile not working properly
  .post(
    '/covers/upload',
    authMiddleware,
    loggedUserGuard,
    uploadCover.single('cover'),
    // validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { path } = req.file;

      const { image } = await imagesServices.uploadImage(imagesData)(path.replace(/\\/g, '/'));
      res.status(201).send(image);
    })
  )
  // @desc ADD user's avatar
  // @route POST /users/:userId/image
  // @access Private - Admin or User Owner(change user avatar irrelevant of the userId entered)
  .post(
    '/:userId/covers',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { role } = req.user;
      const { imageUrl } = req.body;

      const userId = role === rolesEnum.admin ? req.params.userId : req.user.userId;

      const { error, result } = await imagesServices.addUserCover(usersData)(+userId, imageUrl);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The user is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  ) // @desc UPLOAD user's story image
  // @route POST /users/avatars/upload
  // @access Private - Admin only

  // TODO - ValidateFile not working properly
  .post(
    '/stories/upload',
    authMiddleware,
    loggedUserGuard,
    uploadStory.single('story'),
    // validateFile('uploads', uploadFileSchema),
    // errorHandler(
    async (req: Request, res: Response) => {
      const { path } = req.file;

      const { image } = await imagesServices.uploadImage(imagesData)(path.replace(/\\/g, '/'));

      res.status(201).send(image);
    }
  );
// )
// @desc ADD user's avatar
// @route POST /users/:userId/image
// @access Private - Admin or User Owner(change user avatar irrelevant of the userId entered)
// .post(
//   '/:userId/stories',
//   authMiddleware,
//   loggedUserGuard,
//   errorHandler(async (req: Request, res: Response) => {
//     const { role } = req.user;
//     const { imageUrl } = req.body;

//     const userId = role === rolesEnum.admin ? req.params.userId : req.user.userId;

//     const { error, result } = await imagesServices.addUserCover(usersData)(+userId, imageUrl);

//     if (error === errors.RECORD_NOT_FOUND) {
//       res.status(404).send({
//         message: 'The user is not found.'
//       });
//     } else {
//       res.status(201).send(result);
//     }
//   })
// )

export default imagesController;
