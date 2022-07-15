import express, { Request, Response } from 'express';

import storiesServices from '../services/stories-services.js';

import storiesData from '../data/stories-data.js';
import storiesImagesData from '../data/story-images-data.js';

import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import updateStorySchema from '../validator/update-story-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createStorySchema from '../validator/create-story-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';
import RequestQuery from '../models/RequestQuery.js';
import usersData from '../data/users-data.js';

const storiesController = express.Router();

storiesController
  //TODO find if user is a friend
  // @desc GET All stories incl search, sort, paging
  // @route GET /stories
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {

      const { userId } = req.user;

      const { search = '', filter = '', sort = 'sort=createdAt asc' } = req.query;

      let { pageSize = paging.DEFAULT_STORY_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_STORY_PAGESIZE) pageSize = paging.MAX_STORY_PAGESIZE;
      if (+pageSize < paging.MIN_STORY_PAGESIZE) pageSize = paging.MIN_STORY_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, stories } = await storiesServices.getAllMyStories(storiesData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's stories.`
        });
      } else {
        res.status(200).send(stories);
      }
    })
  )
  //OK
  // @desc GET stories by ID
  // @route GET /stories/:storyId
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/:userId/:storyId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { storyId, userId } = req.params;
      const isProfileOwner = +userId === req.user.userId;
      const { role } = req.user;

      const { error, story } = await storiesServices.getStoryById(storiesData)(
        +storyId,
        +userId,
        isProfileOwner,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A story with this number is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to view this story.'
        });
      } else {
        res.status(200).send(story);
      }
    })
  )
  //OK
  // @desc CREATE stories by ID
  // @route POST /stories/:storyId
  // @access Private - Logged users
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    validateBody('story', createStorySchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const data = req.body;
      const { story } = await storiesServices.createStory(storiesData, usersData)(data);

      res.status(201).send(story);
    })
  // )
  // @desc EDIT stories by ID
  // @route PUT /stories/:storyId
  // @access Private - Admin or Profile Owner
  .put(
    '/:userId/:storyId',
    authMiddleware,
    loggedUserGuard,
    validateBody('story', updateStorySchema),
    errorHandler(async (req: Request, res: Response) => {
      const { storyId, userId } = req.params;

      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const updatedStoryData = req.body;
      const { error, result } = await storiesServices.updateStory(storiesData, usersData)(
        +storyId,
        +userId,
        isProfileOwner,
        role,
        updatedStoryData
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The story is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to update this story.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc DELETE story
  // @route DELETE /stories/:storyId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:userId/:storyId',
    authMiddleware,
    loggedUserGuard,
    // roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { storyId, userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;

      const { error, story } = await storiesServices.deleteStory(storiesData)(
        +storyId,
        isProfileOwner,
        role
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A story with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this story.'
        });
      } else {
        res.status(200).send(story);
      }
    })
  )
  // @desc UPLOAD story's image
  // @route POST /stories/images/upload
  // @access Private - Admin only
  .post(
    '/images/upload',
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
  // @desc ADD story's image
  // @route POST /stories/:storyId/image
  // @access Private - Admin only
  .post(
    '/:storyId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // validateBody('storyImage', addStoryImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { storyId } = req.params;
      const { imageUrl } = req.body;
      const { error, result } = await storiesServices.addStoryImage(storiesImagesData, storiesData)(
        +storyId,
        imageUrl
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The story is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )
  // @desc GET ALL story's images
  // @route GET /stories/:storyId/image
  // @access Public
  .get(
    '/:storyId/images',
    errorHandler(async (req: Request, res: Response) => {
      const { storyId } = req.params;

      const { error, result } = await storiesServices.getAllStoryImages(
        storiesImagesData,
        storiesData
      )(+storyId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The story is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc DELETE story image
  // @route DELETE /stories/:storyImageId/images
  // @access Private - Admin only
  .delete(
    '/:storyImageId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { storyImageId } = req.params;
      const { error, deletedImage } = await storiesServices.deleteStoryImage(storiesImagesData)(
        +storyImageId
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A story image with this id is not found!'
        });
      } else {
        res.status(200).send(deletedImage);
      }
    })
  )
  // )
  // @desc SET story image as main
  // @route PUT /stories/:storyImageId/images/main
  // @access Private - Admin only
  // .put(
  //   '/:storyImageId/images/main',
  //   authMiddleware,
  //   loggedUserGuard,
  //   roleMiddleware(rolesEnum.admin),
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { storyImageId } = req.params;

  //     const { error, newMainImage } = await storiesServices.setStoryImageAsMain(storiesImagesData)(
  //       +storyImageId
  //     );

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The story image is not found.'
  //       });
  //     } else {
  //       res.status(200).send(newMainImage);
  //     }
  //   })
  // );

export default storiesController;
