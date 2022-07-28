import express, { Request, Response } from 'express';

import commentsImagesServices from '../services/comments-images-services.js';

import commentsData from '../data/comments-data.js';
import postsData from '../data/posts-data.js';
import imagesData from '../data/images-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import createCommentSchema from '../validator/create-comment-schema.js';
import updateCommentSchema from '../validator/update-comment-schema.js';
import voteCommentSchema from '../validator/create-comment-reaction-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import RequestQuery from '../models/RequestQuery.js';
import commentsImagesData from '../data/comments-images-data.js';

const commentsImagesController = express.Router();

commentsImagesController
  // @desc CREATE post image comment
  // @route POST/comments-images/:postId/:imageId
  // @access Private - logged users
  .post(
    '/:postId/:imageId',
    authMiddleware,
    loggedUserGuard,
    validateBody('comment', createCommentSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId, imageId } = req.params;
      const { content, replyTo } = req.body;
      const { userId: authorId } = req.user;

      const { error, result } = await commentsImagesServices.createPostImageComment(
        imagesData,
        commentsImagesData
      )(content, +authorId, +postId, +imageId, replyTo);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post image is not found.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )

  // @desc GET All post images comments
  // @route GET/comments-images/:postId
  // @access Private - logged users
  .get(
    '/:postId/:imageId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(
      async (
        req: Request<{ postId: number; imageId: number }, {}, {}, RequestQuery>,
        res: Response
      ) => {
        const { postId, imageId } = req.params;
        const { search = '', sort = 'created_at desc' } = req.query;

        let { pageSize = paging.DEFAULT_COMMENTS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

        if (+pageSize > paging.MAX_COMMENTS_PAGESIZE) pageSize = paging.MAX_COMMENTS_PAGESIZE;
        if (+pageSize < paging.MIN_COMMENTS_PAGESIZE) pageSize = paging.MIN_COMMENTS_PAGESIZE;
        if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

        const { error, result } = await commentsImagesServices.getAllPostImageComments(
          commentsImagesData,
          imagesData
        )(+postId, +imageId, search, sort, +page, +pageSize);

        if (error === errors.RECORD_NOT_FOUND) {
          res.status(404).send({
            message: 'The post is not found.'
          });
        } else {
          res.status(200).send(result);
        }
      }
    )
  )

  // @desc EDIT post comment
  // @route PUT /comments-images/:postImageCommentId
  // @access Private - logged users who have created the comment or Admin
  .put(
    '/:postImageCommentId',
    authMiddleware,
    loggedUserGuard,
    validateBody('comment', updateCommentSchema),
    // errorHandler(
    async (req: Request, res: Response) => {
      const { content } = req.body;
      const { postImageCommentId } = req.params;
      const { userId: authorId, role } = req.user;

      const { error, result } = await commentsImagesServices.updatePostImageComment(
        commentsImagesData
      )(content, +postImageCommentId, +authorId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The comment is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this comment`
        });
      } else {
        res.status(200).send(result);
      }
    }
  )
  // )

  // @desc DELETE post comment
  // @route DELETE/comments-images/:postImageCommentId
  // @access Private - logged users who have created the comment or Admin
  .delete(
    '/:postImageCommentId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId: authorId, role } = req.user;
      const { postImageCommentId } = req.params;

      const { error, result } = await commentsImagesServices.deletePostImageComment(
        commentsImagesData
      )(+postImageCommentId, +authorId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The comment is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this comment`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default commentsImagesController;
