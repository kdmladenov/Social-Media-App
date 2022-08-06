import express, { Request, Response } from 'express';

import savedPostsServices from '../services/saved-posts-services.js';
import savedPostsData from '../data/saved-posts-data.js';

import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import errors from '../constants/service-errors.js';
import usersData from '../data/users-data.js';
import { DEFAULT_COLLECTION, paging } from '../constants/constants.js';
import RequestQuery from '../models/RequestQuery.js';
import validateBody from '../middleware/validate-body.js';
import updateSavedPostSchema from '../validator/update-saved-post-schema.js';
import createSavedPostSchema from '../validator/create-saved-post-schema.js';
import postsData from '../data/posts-data.js';

const savedPostsController = express.Router();

savedPostsController
  //TODO find if user is a friend
  // @desc GET All saved posts incl search, sort, paging
  // @route GET /saved posts
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { userId } = req.user;

      const { search = '', filter = '', sort = 'sort=createdAt asc' } = req.query;

      let { pageSize = paging.DEFAULT_POST_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_POST_PAGESIZE) pageSize = paging.MAX_POST_PAGESIZE;
      if (+pageSize < paging.MIN_POST_PAGESIZE) pageSize = paging.MIN_POST_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, savedPosts } = await savedPostsServices.getAllMySavedPosts(savedPostsData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's saved posts.`
        });
      } else {
        res.status(200).send(savedPosts);
      }
    })
  )
  // @desc CREATE saved posts by ID
  // @route POST /saved-posts/:postId
  // @access Private - Logged users
  .post(
    '/:postId',
    authMiddleware,
    loggedUserGuard,
    validateBody('savedPost', createSavedPostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { collection = DEFAULT_COLLECTION } = req.body;
      const { postId } = req.params;
      const { userId } = req.user;
      const { error, savedPost } = await savedPostsServices.addSavedPost(savedPostsData, postsData)(
        +postId,
        +userId,
        collection
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A post with this id is not found!'
        });
      } else {
        res.status(201).send(savedPost);
      }
    })
  )

  // @desc EDIT saved posts collection
  // @route PUT /saved-posts/:postId
  // @access Private - Admin or Profile Owner
  .put(
    '/:postId',
    authMiddleware,
    loggedUserGuard,
    validateBody('savedPost', updateSavedPostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { collection } = req.body;
      const { userId } = req.user;

      const { error, savedPost } = await savedPostsServices.updateSavedPost(savedPostsData)(
        +postId,
        +userId,
        collection
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to edit this saved post.'
        });
      } else {
        res.status(200).send(savedPost);
      }
    })
  )

  // @desc DELETE saved post
  // @route DELETE /saved-posts/:postId
  // @access Private - AdminpostId or the ProfileOwner
  .delete(
    '/:postId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { role, userId } = req.user;

      const { error, savedPost } = await savedPostsServices.deleteSavedPost(savedPostsData)(
        +postId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A saved post with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this saved post.'
        });
      } else {
        res.status(200).send(savedPost);
      }
    })
  ) //TODO find if user is a friend
  // @desc GET All collections incl search, sort, paging
  // @route GET /collections
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/collections',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { userId } = req.user;

      const { search = '', filter = '', sort = 'sort=createdAt asc' } = req.query;

      let { pageSize = paging.DEFAULT_POST_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_POST_PAGESIZE) pageSize = paging.MAX_POST_PAGESIZE;
      if (+pageSize < paging.MIN_POST_PAGESIZE) pageSize = paging.MIN_POST_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, collections } = await savedPostsServices.getAllUserCollections(savedPostsData)(
        +userId,
        search,
        filter,
        sort,
        +pageSize,
        +page
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's collections.`
        });
      } else {
        res.status(200).send(collections);
      }
    })
  )

  // @desc CREATE collections by postId
  // @route POST /saved-posts/:postId/collections
  // @access Private - Logged users
  .post(
    '/:userId/collections',
    authMiddleware,
    loggedUserGuard,
    validateBody('savedPost', createSavedPostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { collection } = req.body;
      const { userId } = req.params;
      const { createdCollection } = await savedPostsServices.addCollection(savedPostsData)(
        +userId,
        collection
      );

      res.status(201).send(createdCollection);
    })
  )

  // @desc EDIT collection name
  // @route PUT /saved-posts/:postId
  // @access Private - Admin or Profile Owner
  .put(
    '/:collectionId/collections',
    authMiddleware,
    loggedUserGuard,
    validateBody('savedPost', updateSavedPostSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { collectionId } = req.params;
      const { collection } = req.body;
      const { role, userId } = req.user;

      const { error, updatedCollection } = await savedPostsServices.updateCollection(
        savedPostsData
      )(+collectionId, +userId, collection, role);

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to edit this collection.'
        });
      } else {
        res.status(200).send(updatedCollection);
      }
    })
  )

  // @desc DELETE saved post
  // @route DELETE /saved-posts/:postId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:collectionId/collections',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { collectionId } = req.params;
      const { role, userId } = req.user;

      const { error, deletedCollection } = await savedPostsServices.deleteCollection(
        savedPostsData
      )(+collectionId, +userId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A collection with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this collection.'
        });
      } else {
        res.status(200).send(deletedCollection);
      }
    })
  );

export default savedPostsController;
