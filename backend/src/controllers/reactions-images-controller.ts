import express, { Request, Response } from 'express';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import errors from '../constants/service-errors.js';
import imagesData from '../data/images-data.js';
import reactionsImagesData from '../data/reactions-images-data.js';
import reactionsImagesServices from '../services/reactions-images-services.js';
import createReactionSchema from '../validator/create-reaction-schema.js';
import updateReactionSchema from '../validator/update-reaction-schema.js';
import commentsImagesData from '../data/comments-images-data.js';

const reactionsImagesController = express.Router();

reactionsImagesController
  // @desc CREATE post image reaction
  // @route POST/reactions-images/post-images/:postId/:imageId
  // @access Private - logged users
  .post(
    '/post-images/:postId/:imageId',
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
  // @route GET/reactions-images/post-images/:postId/:imageId
  // @access Private - logged users
  .get(
    '/post-images/:postId/:imageId',
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
  // @route PUT/reactions-images/post-images/:reactionPostImageId
  // @access Private - logged users who have created the reaction or Admin
  .put(
    '/post-images/:reactionPostImageId',
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
  // @route DELETE/post-images/:reactionPostImageId
  // @access Private - logged users who have created the reaction or Admin
  .delete(
    '/post-images/:reactionPostImageId',
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
  ) // @desc CREATE post image reaction
  // @route POST/reactions-images/image-comments/:postImageCommentId
  // @access Private - logged users
  .post(
    '/image-comments/:postImageCommentId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', createReactionSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const { postImageCommentId } = req.params;
      const { reactionName } = req.body;
      const { userId } = req.user;

      const { error, createdPostImageCommentReaction } =
        await reactionsImagesServices.createPostImageCommentReaction(
          commentsImagesData,
          reactionsImagesData
        )(+userId, +postImageCommentId, reactionName);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post image comment is not found.'
        });
      } else {
        res.status(201).send(createdPostImageCommentReaction);
      }
    })
  // )
  // @desc GET All post image reactions
  // @route GET/reactions-images/image-comments/:postImageCommentId
  // @access Private - logged users
  .get(
    '/image-comments/:postImageCommentId',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req: Request, res: Response) => {
      const { postImageCommentId } = req.params;

      const { error, postImageCommentReactions } =
        await reactionsImagesServices.getAllPostImageCommentReactions(
          reactionsImagesData,
          commentsImagesData
        )(+postImageCommentId);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The post image comment is not found.'
        });
      } else {
        res.status(200).send(postImageCommentReactions);
      }
    }
  )
  // )

  // @desc EDIT post image reaction
  // @route PUT/reactions-images/image-comments/:reactionPostImageCommentId
  // @access Private - logged users who have created the reaction or Admin
  .put(
    '/image-comments/:reactionPostImageCommentId',
    authMiddleware,
    loggedUserGuard,
    validateBody('reaction', updateReactionSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { reactionName } = req.body;
      const { reactionPostImageCommentId } = req.params;
      const { userId, role } = req.user;

      const { error, updatedPostImageCommentReaction } =
        await reactionsImagesServices.updatePostImageCommentReaction(reactionsImagesData)(
          reactionName,
          +reactionPostImageCommentId,
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
        res.status(200).send(updatedPostImageCommentReaction);
      }
    })
  )

  // @desc DELETE post image reaction
  // @route DELETE/image-comments/:reactionPostImageCommentId
  // @access Private - logged users who have created the reaction or Admin
  .delete(
    '/image-comments/:reactionPostImageCommentId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { reactionPostImageCommentId } = req.params;
      const { userId, role } = req.user;

      const { error, deletedPostImageCommentReaction } =
        await reactionsImagesServices.deletePostImageCommentReaction(reactionsImagesData)(
          +reactionPostImageCommentId,
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
        res.status(200).send(deletedPostImageCommentReaction);
      }
    })
  );
  
export default reactionsImagesController;
