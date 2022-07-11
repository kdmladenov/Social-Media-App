import express, { Request, Response } from 'express';

import workplacesServices from '../services/workplaces-services.js';

import workplacesData from '../data/workplaces-data.js';

import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import updateWorkplaceSchema from '../validator/update-workplace-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createWorkplaceSchema from '../validator/create-workplace-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';
import RequestQuery from '../models/RequestQuery.js';
import usersData from '../data/users-data.js';

const workplacesController = express.Router();

workplacesController
  //TODO find if user is a friend
  // @desc GET All workplaces incl search, sort, paging
  // @route GET /workplaces
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;
      const { error, workplaces } = await workplacesServices.getAllMyWorkplaces(workplacesData)(
        +userId
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's workplaces.`
        });
      } else {
        res.status(200).send(workplaces);
      }
    })
  )
  //OK
  // @desc GET workplaces by userId
  // @route GET /workplaces/:workplaceId
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/:userId/:workplaceId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId, workplaceId } = req.params;
      const isProfileOwner = +userId === req.user.userId;
      const { role } = req.user;

      const { error, workplace } = await workplacesServices.getWorkplaceById(workplacesData)(
        +workplaceId,
        isProfileOwner,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A user with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to view this workplace.'
        });
      } else {
        res.status(200).send(workplace);
      }
    })
  )
  //OK
  // @desc CREATE workplaces by ID
  // @route POST /workplaces/:workplaceId
  // @access Private - Logged users
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    validateBody('workplace', createWorkplaceSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const data = req.body;
      const { workplace } = await workplacesServices.createWorkplace(workplacesData, usersData)(data);

      res.status(201).send(workplace);
    })
  // )
  // @desc EDIT workplaces by ID
  // @route PUT /workplaces/:workplaceId
  // @access Private - Admin or Profile Owner
  .put(
    '/:userId/:workplaceId',
    authMiddleware,
    loggedUserGuard,
    validateBody('workplace', updateWorkplaceSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const { workplaceId, userId } = req.params;

      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const data = req.body;
      const { error, result } = await workplacesServices.updateWorkplace(workplacesData, usersData)(
        +workplaceId,
        +userId,
        isProfileOwner,
        role,
        data
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The workplace is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to update this workplace.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  // )

  // @desc DELETE workplace
  // @route DELETE /workplaces/:workplaceId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:userId/:workplaceId',
    authMiddleware,
    loggedUserGuard,
    // roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { workplaceId, userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;

      const { error, workplace } = await workplacesServices.deleteWorkplace(workplacesData)(
        +workplaceId,
        isProfileOwner,
        role
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A workplace with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this workplace.'
        });
      } else {
        res.status(200).send(workplace);
      }
    })
  );
  

export default workplacesController;
