import express, { Request, Response } from 'express';

import reactionsServices from '../services/reactions-services.js';

import reactionsData from '../data/reactions-data.js';
import postsData from '../data/posts-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import errors from '../constants/service-errors.js';
import createPostReactionSchema from '../validator/create-reaction-schema.js';
import updatePostReactionSchema from '../validator/update-reaction-schema.js';
import createCommentReactionSchema from '../validator/create-comment-reaction-schema.js';
import commentsData from '../data/comments-data.js';
import updateCommentReactionSchema from '../validator/update-comment-reaction-schema.js';
import imagesData from '../data/images-data.js';
import reactionsImagesData from '../data/reactions-images-data.js';
import reactionsImagesServices from '../services/reactions-images-services.js';
import createReactionSchema from '../validator/create-reaction-schema.js';
import updateReactionSchema from '../validator/update-reaction-schema.js';

const reactionsImagesController = express.Router();

reactionsImagesController
  // @desc CREATE post image reaction
  // @route POST/reactions-images/post-image/:postId/:imageId
  // @access Private - logged users
  .post(
    '/post-image/:postId/:imageId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', createReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { postId, imageId } = req.params;
      const { reactionName } = req.body;
      const { userId } = req.user;

      const { error, createdPostImageReaction } =
        await reactionsImagesServices.createPostImageReaction(imagesData, reactionsImagesData)(
          +userId,
          +postId,
          +imageId,
          reactionName
        );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post is not found.'
        });
      } else {
        res.status(201).send(createdPostImageReaction);
      }
    })
  )

  // @desc GET All post image reactions
  // @route GET/reactions-images/post-image/:postId/:imageId
  // @access Private - logged users
  .get(
    '/post-image/:postId/:imageId',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req: Request, res: Response) => {
      const { postId, imageId } = req.params;

      const { error, postImageReactions } = await reactionsImagesServices.getAllPostImageReactions(
        reactionsImagesData,
        imagesData
      )(+postId, +imageId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post image is not found.'
        });
      } else {
        res.status(200).send(postImageReactions);
      }
    }
  )
  // )

  // @desc EDIT post image reaction
  // @route PUT/reactions-images/post-image/:reactionPostImageId
  // @access Private - logged users who have created the reaction or Admin
  .put(
    '/post-image/:reactionPostImageId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', updateReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { reactionPostImageId } = req.params;
      const { userId, role } = req.user;

      const { error, updatedPostImageReaction } =
        await reactionsImagesServices.updatePostImageReaction(reactionsImagesData)(
          reactionName,
          +reactionPostImageId,
          +userId,
          role
        );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to edit this reaction`
        });
      } else {
        res.status(200).send(updatedPostImageReaction);
      }
    })
  )

  // @desc DELETE post image reaction
  // @route DELETE/post-image/:reactionPostImageId
  // @access Private - logged users who have created the reaction or Admin
  .delete(
    '/post-image/:reactionPostImageId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { reactionPostImageId } = req.params;
      const { userId, role } = req.user;

      const { error, deletedPostImageReaction } =
        await reactionsImagesServices.deletePostImageReaction(reactionsImagesData)(
          +reactionPostImageId,
          +userId,
          role
        );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The reaction is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to delete this reaction`
        });
      } else {
        res.status(200).send(deletedPostImageReaction);
      }
    })
  )
  // // @desc CREATE comment reaction
  // // @route POST/reactions-images/comment/:commentId
  // // @access Private - logged users
  // .post(
  //   '/comment/:commentId',
  //   authMiddleware,
  //   loggedUserGuard,
  //   validateBody('commentReaction', createCommentReactionSchema),
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { commentId } = req.params;
  //     const { reactionName } = req.body;
  //     const { userId } = req.user;

  //     const { error, createdCommentReaction } = await reactionsServices.createCommentReaction(
  //       commentsData,
  //       reactionsData
  //     )(+userId, +commentId, reactionName);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The comment is not found.'
  //       });
  //     } else {
  //       res.status(201).send(createdCommentReaction);
  //     }
  //   })
  // )

  // // @desc GET All comment reactions
  // // @route GET/reactions-images/comment/:commentId
  // // @access Private - logged users
  // .get(
  //   '/comment/:commentId',
  //   authMiddleware,
  //   loggedUserGuard,
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { commentId } = req.params;

  //     const { error, commentReactions } = await reactionsServices.getAllCommentReactions(
  //       reactionsData,
  //       commentsData
  //     )(+commentId);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The comment is not found.'
  //       });
  //     } else {
  //       res.status(200).send(commentReactions);
  //     }
  //   })
  // )

  // // @desc EDIT comment reaction
  // // @route PUT/reactions-images/comment/:reactionId
  // // @access Private - logged users who have created the reaction or Admin
  // .put(
  //   '/comment/:reactionId',
  //   authMiddleware,
  //   loggedUserGuard,
  //   validateBody('commentReaction', updateCommentReactionSchema),
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { reactionName } = req.body;
  //     const { reactionId } = req.params;
  //     const { userId, role } = req.user;

  //     const { error, updatedCommentReaction } = await reactionsServices.updateCommentReaction(
  //       reactionsData
  //     )(reactionName, +reactionId, +userId, role);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The reaction is not found.'
  //       });
  //     } else if (error === errors.OPERATION_NOT_PERMITTED) {
  //       res.status(403).send({
  //         message: `You are not authorized to edit this reaction`
  //       });
  //     } else {
  //       res.status(200).send(updatedCommentReaction);
  //     }
  //   })
  // )

  // // @desc DELETE comment reaction
  // // @route DELETE/reactions-images/comment/:reactionId
  // // @access Private - logged users who have created the reaction or Admin
  // .delete(
  //   '/comment/:reactionId',
  //   authMiddleware,
  //   loggedUserGuard,
  //   errorHandler(async (req: Request, res: Response) => {
  //     const { reactionId } = req.params;
  //     const { userId, role } = req.user;

  //     const { error, deletedCommentReaction } = await reactionsServices.deleteCommentReaction(
  //       reactionsData
  //     )(+reactionId, +userId, role);

  //     if (error === errors.RECORD_NOT_FOUND) {
  //       res.status(404).send({
  //         message: 'The reaction is not found.'
  //       });
  //     } else if (error === errors.OPERATION_NOT_PERMITTED) {
  //       res.status(403).send({
  //         message: `You are not authorized to delete this reaction`
  //       });
  //     } else {
  //       res.status(200).send(deletedCommentReaction);
  //     }
  //   })
  // );
export default reactionsImagesController;
