import express, { Request, Response } from 'express';
import imagesServices from '../services/images-services.js';
import postsData from '../data/posts-data.js';
import imagesData from '../data/images-data.js';
import validateFile from '../middleware/validate-file.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';
import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';
import errors from '../constants/service-errors.js';
import rolesEnum from '../constants/roles.enum.js';
import usersData from '../data/users-data.js';
import RequestQuery from '../models/RequestQuery.js';
import {
  GOOGLE_DRIVE_FOLDER_IDS,
  GOOGLE_DRIVE_PUBLIC_URL,
  paging,
  uploads
} from '../constants/constants.js';
import { uploadFile } from '../helpers/uploadFile.js';

const imagesController = express.Router();
// TO DO file  validation

imagesController
  // @desc UPLOAD post's image
  // @route POST /images/posts/upload
  // @access Private - Admin only
  .post(
    '/posts/upload',
    authMiddleware,
    loggedUserGuard,
    uploadImage.array('postImages', uploads.MULTIPLE_IMAGES_MAX_COUNT),
    // validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { files } = req;
      const uploadedFiles = await Promise.all(
        files?.map(async (file) => await uploadFile(file, GOOGLE_DRIVE_FOLDER_IDS.posts))
      );
      res.status(201).send(uploadedFiles);
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
    // validateFile('uploads', uploadFileSchema),
    uploadImage.single('avatar'),
    errorHandler(async (req: Request, res: Response) => {
      const { file } = req;
      const uploadedAvatarImageFileData = await uploadFile(
        file,
        GOOGLE_DRIVE_FOLDER_IDS.profile_avatars
      );
      const { image } = await imagesServices.uploadImage(imagesData)(
        `${GOOGLE_DRIVE_PUBLIC_URL}${uploadedAvatarImageFileData.id}`
      );

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
  .post(
    '/covers/upload',
    authMiddleware,
    loggedUserGuard,
    uploadImage.single('cover'),
    // TO DO file  validation
    // validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { file } = req;
      const uploadedAvatarCoverFileData = await uploadFile(
        file,
        GOOGLE_DRIVE_FOLDER_IDS.profile_covers
      );
      const { image } = await imagesServices.uploadImage(imagesData)(
        `${GOOGLE_DRIVE_PUBLIC_URL}${uploadedAvatarCoverFileData.id}`
      );

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
  )
  // @desc UPLOAD user's story image
  // @route POST /users/avatars/upload
  // @access Private - Admin only
  .post(
    '/stories/upload',
    authMiddleware,
    loggedUserGuard,
    uploadImage.single('story'),
    // validateFile('uploads', uploadFileSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { file } = req;

      const uploadedStoryImageFileData = await uploadFile(file, GOOGLE_DRIVE_FOLDER_IDS.stories);
      const { image } = await imagesServices.uploadImage(imagesData)(
        `${GOOGLE_DRIVE_PUBLIC_URL}${uploadedStoryImageFileData.id}`
      );

      res.status(201).send(image);
    })
  );

export default imagesController;
