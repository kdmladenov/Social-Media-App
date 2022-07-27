import express, { Request, Response } from 'express';

import reactionsServices from '../services/reactions-services.js';

import reactionsData from '../data/reactions-data.js';
import postsData from '../data/posts-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import errors from '../constants/service-errors.js';
import createCommentReactionSchema from '../validator/create-comment-reaction-schema.js';
import commentsData from '../data/comments-data.js';
import updateCommentReactionSchema from '../validator/update-comment-reaction-schema.js';
import createReactionSchema from '../validator/create-reaction-schema.js';
import updateReactionSchema from '../validator/update-reaction-schema.js';

const reactionsController = express.Router();

reactionsController
  // @desc CREATE post reaction
  // @route POST/reactions/post/:postId
  // @access Private - logged users
  .post(
    '/post/:postId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', createReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId } = req.params;
      const { reactionName } = req.body;
      const { userId } = req.user;

      const { error, createdPostReaction } = await reactionsServices.createPostReaction(
        postsData,
        reactionsData
      )(+userId, +postId, reactionName);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(201).send(createdPostReaction);
      }
    })
  )

  // @desc GET All post reactions
  // @route GET/reactions/post/:postId
  // @access Private - logged users
  .get(
    '/post/:postId',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req: Request, res: Response) => {
      const { postId } = req.params;

      const { error, postReactions } = await reactionsServices.getAllPostReactions(
        reactionsData,
        postsData
      )(+postId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(200).send(postReactions);
      }
    }
  )
  // )

  // @desc EDIT post reaction
  // @route PUT/reactions/post/:reactionId
  // @access Private - logged users who have created the reaction or Admin
  .put(
    '/post/:reactionId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', updateReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { reactionId } = req.params;
      const { userId, role } = req.user;

      const { error, updatedPostReaction } = await reactionsServices.updatePostReaction(
        reactionsData
      )(reactionName, +reactionId, +userId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this reaction`
        });
      } else {
        res.status(200).send(updatedPostReaction);
      }
    })
  )

  // @desc DELETE post reaction
  // @route DELETE/post/:reactionId
  // @access Private - logged users who have created the reaction or Admin
  .delete(
    '/post/:reactionId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { reactionId } = req.params;
      const { userId, role } = req.user;

      const { error, deletedPostReaction } = await reactionsServices.deletePostReaction(
        reactionsData
      )(+reactionId, +userId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this reaction`
        });
      } else {
        res.status(200).send(deletedPostReaction);
      }
    })
  )
  // @desc CREATE comment reaction
  // @route POST/reactions/comment/:commentId
  // @access Private - logged users
  .post(
    '/comment/:commentId',
    authMiddleware,
    loggedUserGuard,
    validateBody('commentReaction', createCommentReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { commentId } = req.params;
      const { reactionName } = req.body;
      const { userId } = req.user;

      const { error, createdCommentReaction } = await reactionsServices.createCommentReaction(
        commentsData,
        reactionsData
      )(+userId, +commentId, reactionName);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The comment is not found.'
        });
      } else {
        res.status(201).send(createdCommentReaction);
      }
    })
  )

  // @desc GET All comment reactions
  // @route GET/reactions/comment/:commentId
  // @access Private - logged users
  .get(
    '/comment/:commentId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { commentId } = req.params;

      const { error, commentReactions } = await reactionsServices.getAllCommentReactions(
        reactionsData,
        commentsData
      )(+commentId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The comment is not found.'
        });
      } else {
        res.status(200).send(commentReactions);
      }
    })
  )

  // @desc EDIT comment reaction
  // @route PUT/reactions/comment/:reactionId
  // @access Private - logged users who have created the reaction or Admin
  .put(
    '/comment/:reactionId',
    authMiddleware,
    loggedUserGuard,
    validateBody('commentReaction', updateCommentReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { reactionId } = req.params;
      const { userId, role } = req.user;

      const { error, updatedCommentReaction } = await reactionsServices.updateCommentReaction(
        reactionsData
      )(reactionName, +reactionId, +userId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this reaction`
        });
      } else {
        res.status(200).send(updatedCommentReaction);
      }
    })
  )

  // @desc DELETE comment reaction
  // @route DELETE/reactions/comment/:reactionId
  // @access Private - logged users who have created the reaction or Admin
  .delete(
    '/comment/:reactionId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { reactionId } = req.params;
      const { userId, role } = req.user;

      const { error, deletedCommentReaction } = await reactionsServices.deleteCommentReaction(
        reactionsData
      )(+reactionId, +userId, role);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this reaction`
        });
      } else {
        res.status(200).send(deletedCommentReaction);
      }
    })
  );
export default reactionsController;
