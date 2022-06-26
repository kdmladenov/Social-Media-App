import express, { Request, Response } from 'express';

import commentsServices from '../services/comments-services.js';

import commentsData from '../data/comments-data.js';
import postsData from '../data/posts-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import createCommentSchema from '../validator/create-comment-schema.js';
import updateCommentSchema from '../validator/update-comment-schema.js';
import voteCommentSchema from '../validator/vote-comment-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import RequestQuery from '../models/RequestQuery.js';

const commentsController = express.Router();

commentsController
  // @desc CREATE post comment
  // @route POST/comments/:postId
  // @access Private - logged users
  .post(
    '/:postId',
    authMiddleware,
    loggedUserGuard,
    validateBody('comment', createCommentSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { content, replyTo } = req.body;
      const { userId: authorId } = req.user;

      const { error, result } = await commentsServices.createComment(postsData, commentsData)(
        content,
        +authorId,
        +postId,
        replyTo
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

  // @desc GET All post comments
  // @route GET/comments/:postId
  // @access Public
  .get(
    '/:postId',
    errorHandler(async (req: Request<{ postId: number }, {}, {}, RequestQuery>, res: Response) => {
      const { postId } = req.params;
      const { search = '', sort = 'date_created desc' } = req.query;

      let { pageSize = paging.DEFAULT_COMMENTS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_COMMENTS_PAGESIZE) pageSize = paging.MAX_COMMENTS_PAGESIZE;
      if (+pageSize < paging.MIN_COMMENTS_PAGESIZE) pageSize = paging.MIN_COMMENTS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const { error, result } = await commentsServices.getAllComments(commentsData, postsData)(
        +postId,
        search,
        sort,
        +page,
        +pageSize
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  )

  // @desc EDIT post comment
  // @route PUT/:commentId
  // @access Private - logged users who have created the comment or Admin
  .put(
    '/:commentId',
    authMiddleware,
    loggedUserGuard,
    validateBody('comment', updateCommentSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const { content } = req.body;
      const { commentId } = req.params;
      const { userId: authorId, role } = req.user;

      const { error, result } = await commentsServices.updateComment(commentsData)(
        content,
        +commentId,
        +authorId,
        role
      );

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
    })
  // )

  // @desc DELETE post comment
  // @route DELETE/:commentId
  // @access Private - logged users who have created the comment or Admin
  .delete(
    '/:commentId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(
      async (req: Request, res: Response) => {
      const { userId: authorId, role } = req.user;
      const { commentId } = req.params;

      const { error, result } = await commentsServices.deleteComment(commentsData)(
        +commentId,
        +authorId,
        role
      );

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
  )
  // @desc CREATE post comment reaction (like)
  // @route POST/comments/:commentId/votes
  // @access Private - Logged users only
  .post(
    '/:commentId/votes',
    authMiddleware,
    loggedUserGuard,
    validateBody('vote', voteCommentSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { commentId } = req.params;
      const { userId, role } = req.user;

      const { result } = await commentsServices.voteComment(commentsData)(
        reactionName,
        +commentId,
        +userId
      );
      res.status(201).send(result);
    })
  )
  // @desc DELETE post comment vote
  // @route DELETE /comments/:commentId/votes
  // @access Private - logged users who have created the comment or Admin
  .delete(
    '/:commentId/votes',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { commentId } = req.params;
      const { role } = req.user;
      const userId = req.user.userId;

      const { error, result } = await commentsServices.unVoteComment(commentsData)(
        +commentId,
        +userId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(403).send({
          message: 'The comment vote is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this vote`
        });
      } else {
        res.status(200).send(result);
      }
    })
  );

export default commentsController;
