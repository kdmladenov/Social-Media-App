import express, { Request, Response } from 'express';

import postsServices from '../services/posts-services.js';

import postsData from '../data/posts-data.js';
import postsImagesData from '../data/post-images-data.js';

import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import updatePostSchema from '../validator/update-post-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createPostSchema from '../validator/create-post-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';
import RequestQuery from '../models/RequestQuery.js';
import usersData from '../data/users-data.js';

const postsController = express.Router();

postsController
  //TODO find if user is a friend
  // @desc GET All posts incl search, sort, paging
  // @route GET /posts
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/',
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const {
        userId,
        search = '',
        filter = '',
        sort = 'sort=price asc',
        role = 'basic'
      } = req.query;

      const isProfileOwner = +userId === req.user.userId;

      let { pageSize = paging.DEFAULT_POST_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_POST_PAGESIZE) pageSize = paging.MAX_POST_PAGESIZE;
      if (+pageSize < paging.MIN_POST_PAGESIZE) pageSize = paging.MIN_POST_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, posts } = await postsServices.getAllPosts(postsData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page,
        role,
        isProfileOwner
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's posts.`
        });
      } else {
        res.status(200).send(posts);
      }
    })
  )
  //OK
  // @desc GET posts by ID
  // @route GET /posts/:postId
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/:userId/:postId',
    errorHandler(async (req: Request, res: Response) => {
      const { postId, userId } = req.params;
      const isProfileOwner = +userId === req.user.userId;
      const { role } = req.user;

      const { error, post } = await postsServices.getPostById(postsData)(
        +postId,
        +userId,
        isProfileOwner,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A post with this number is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to view this post.'
        });
      } else {
        res.status(200).send(post);
      }
    })
  )
  //OK
  // @desc CREATE posts by ID
  // @route POST /posts/:postId
  // @access Private - Logged users
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    validateBody('post', createPostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const data = req.body;
      const { post } = await postsServices.createPost(postsData, usersData)(data);

      res.status(201).send(post);
    })
  )
  // @desc EDIT posts by ID
  // @route PUT /posts/:postId
  // @access Private - Admin or Profile Owner
  .put(
    '/:userId/:postId',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    validateBody('post', updatePostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId, userId } = req.params;

      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const data = req.body;
      const { error, result } = await postsServices.updatePost(postsData, usersData)(
        +postId,
        +userId,
        isProfileOwner,
        role,
        data
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to update this post.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc DELETE post
  // @route DELETE /posts/:postId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:userId/:postId',
    authMiddleware,
    loggedUserGuard,
    // roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { postId, userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;

      const { error, post } = await postsServices.deletePost(postsData)(
        +postId,
        isProfileOwner,
        role
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A post with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this post.'
        });
      } else {
        res.status(200).send(post);
      }
    })
  )
  // @desc UPLOAD post's image
  // @route POST /posts/images/upload
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
  // @desc ADD post's image
  // @route POST /posts/:postId/image
  // @access Private - Admin only
  .post(
    '/:postId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    // validateBody('postImage', addPostImageSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { imageUrl } = req.body;
      const { error, result } = await postsServices.addPostImage(postsImagesData, postsData)(
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
  .get(
    '/:postId/images',
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;

      const { error, result } = await postsServices.getAllPostImages(
        postsImagesData,
        postsData
      )(+postId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )
  // @desc DELETE post image
  // @route DELETE /posts/:postImageId/images
  // @access Private - Admin only
  .delete(
    '/:postImageId/images',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { postImageId } = req.params;
      const { error, deletedImage } = await postsServices.deletePostImage(postsImagesData)(
        +postImageId
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
  // )
  // @desc SET post image as main
  // @route PUT /posts/:postImageId/images/main
  // @access Private - Admin only
  .put(
    '/:postImageId/images/main',
    authMiddleware,
    loggedUserGuard,
    roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { postImageId } = req.params;

      const { error, newMainImage } = await postsServices.setPostImageAsMain(postsImagesData)(
        +postImageId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post image is not found.'
        });
      } else {
        res.status(200).send(newMainImage);
      }
    })
  );

export default postsController;
