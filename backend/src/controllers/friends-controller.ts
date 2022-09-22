import express, { Request, Response } from 'express';

import friendsServices from '../services/friends-services.js';

import friendsData from '../data/friends-data.js';

import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import { paging } from '../constants/constants.js';
import errors from '../constants/service-errors.js';
import RequestQuery from '../models/RequestQuery.js';
import usersData from '../data/users-data.js';

const friendsController = express.Router();

friendsController
  // @desc send a friend request
  // @route POST /friends
  // @access Public - guest
  .post(
    '/:targetUserId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId: sourceUserId } = req.user;
      const { targetUserId } = req.params;

      const { error, result } = await friendsServices.createFriendRequest(friendsData, usersData)(
        +sourceUserId,
        +targetUserId
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `User ${targetUserId} is not found.`
        });
      } else if (error === errors.DUPLICATE_RECORD) {
        res.status(409).send({
          message: 'A friend request from user ${sourceUserId} already exists.'
        });
      } else {
        res.status(201).send(result);
      }
    })
  )

  // @desc Get all MY friends - approved, with mutual friends count, categorized
  // {friend of friend, work, college, highSchool, homeCity, currentCity}

  // @route GET /friends
  // @access Public - Logged users only
  .get(
    '/:userId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request<{ userId: number }, {}, {}, RequestQuery>, res: Response) => {
      const { userId } = req.params;
      const { search = '', sort = 'sort=user_id asc' } = req.query;
      let { pageSize = paging.DEFAULT_FRIENDS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_FRIENDS_PAGESIZE) pageSize = paging.MAX_FRIENDS_PAGESIZE;
      if (+pageSize < paging.MIN_FRIENDS_PAGESIZE) pageSize = paging.MIN_FRIENDS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const result = await friendsServices.getAllMyFriends(friendsData)(
        +userId,
        search,
        sort,
        +page,
        +pageSize
      );

      res.status(200).send(result);
    })
  )
  // @desc Get All friend requests
  // @route GET /friends/requests
  // @access Public - Logged users only
  .get(
    '/requests',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;

      const result = await friendsServices.getAllMyFriendRequests(friendsData)(+userId);

      res.status(200).send(result);
    })
  )

  // @desc Get all pending SENT friend requests

  // @route GET /friends/requests
  // @access Public - Logged users only
  .get(
    '/requests/sent',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;

      const result = await friendsServices.getAllMySentPendingFriendRequests(friendsData)(+userId);

      res.status(200).send(result);
    })
  )
  // @desc Get all pending RECEIVED friend requests

  // @route GET /friends/requests
  // @access Public - Logged users only
  .get(
    '/requests/received',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;

      const result = await friendsServices.getAllMyReceivedPendingFriendRequests(friendsData)(
        +userId
      );

      res.status(200).send(result);
    })
  )
  // @desc Get all friend suggestions, with mutual friends count

  // @route GET /friends/suggestions
  // @access Public - Logged users only
  .get(
    '/suggestions',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;

      const suggestions = await friendsServices.getAllFriendSuggestions(
        friendsData,
        usersData
      )(+userId);

      res.status(200).send(suggestions);
    })
  )
  // @desc Accept or reject a friend request

  // @route PUT /friends/:sourceUserId:/:requestStatusId
  // @access Private - logged users only
  .put(
    '/:sourceUserId/:requestStatus',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req: Request, res: Response) => {
      const { userId: targetUserId } = req.user;
      const { sourceUserId, requestStatus } = req.params;

      const { error, result } = await friendsServices.updateFriendRequestStatus(
        friendsData,
        usersData
      )(+sourceUserId, +targetUserId, requestStatus);

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `A friend request with user ${sourceUserId} is not found or such user does not exist.`
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `A friend request from user ${sourceUserId} has already been rejected.`
        });
      } else {
        res.status(200).send(result);
      }
    }
  )
  // )
  // @desc UNFRIEND a friend
  // @route DELETE /friends/:friendId
  // @access Private  - logged users only
  .delete(
    '/:friendId',
    authMiddleware,
    loggedUserGuard,
    // errorHandler(
    async (req: Request, res: Response) => {
      const { role, userId } = req.user;
      const { friendId } = req.params;

      const { error, result } = await friendsServices.unfriendFriend(friendsData, usersData)(
        +userId,
        +friendId,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: `A friend with user id ${friendId} is not found.`
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this user.'
        });
      } else {
        res.status(200).send(result);
      }
    }
    // )
  );

export default friendsController;
