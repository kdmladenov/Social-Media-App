import express, { Request, Response } from 'express';

import schoolsServices from '../services/schools-services.js';

import schoolsData from '../data/schools-data.js';

import validateBody from '../middleware/validate-body.js';
import validateFile from '../middleware/validate-file.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import uploadImage from '../middleware/upload-image.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware, roleMiddleware } from '../authentication/auth.middleware.js';

import updateSchoolSchema from '../validator/update-school-schema.js';
import uploadFileSchema from '../validator/upload-file-schema.js';
import createSchoolSchema from '../validator/create-school-schema.js';

import errors from '../constants/service-errors.js';
import { paging } from '../constants/constants.js';
import rolesEnum from '../constants/roles.enum.js';
import RequestQuery from '../models/RequestQuery.js';
import usersData from '../data/users-data.js';

const schoolsController = express.Router();

schoolsController
  //TODO find if user is a friend
  // @desc GET All schools incl search, sort, paging
  // @route GET /schools
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId } = req.user;
      const { error, schools } = await schoolsServices.getAllMySchools(schoolsData)(
        +userId
      );

      if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: `You are not authorized to view this user's schools.`
        });
      } else {
        res.status(200).send(schools);
      }
    })
  )
  //OK
  // @desc GET schools by userId
  // @route GET /schools/:schoolId
  // @access Private - Admin, the ProfileOwner or a Friend of the ProfileOwner
  .get(
    '/:userId/:schoolId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { userId, schoolId } = req.params;
      const isProfileOwner = +userId === req.user.userId;
      const { role } = req.user;

      const { error, school } = await schoolsServices.getSchoolById(schoolsData)(
        +schoolId,
        isProfileOwner,
        role
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A user with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to view this school.'
        });
      } else {
        res.status(200).send(school);
      }
    })
  )
  //OK
  // @desc CREATE schools by ID
  // @route POST /schools/:schoolId
  // @access Private - Logged users
  .post(
    '/',
    authMiddleware,
    loggedUserGuard,
    validateBody('school', createSchoolSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const data = req.body;
      const { school } = await schoolsServices.createSchool(schoolsData, usersData)(data);

      res.status(201).send(school);
    })
  // )
  // @desc EDIT schools by ID
  // @route PUT /schools/:schoolId
  // @access Private - Admin or Profile Owner
  .put(
    '/:userId/:schoolId',
    authMiddleware,
    loggedUserGuard,
    validateBody('school', updateSchoolSchema),
    // errorHandler(
      async (req: Request, res: Response) => {
      const { schoolId, userId } = req.params;

      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;
      const data = req.body;
      const { error, result } = await schoolsServices.updateSchool(schoolsData, usersData)(
        +schoolId,
        +userId,
        isProfileOwner,
        role,
        data
      );

      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'The school is not found.'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to update this school.'
        });
      } else {
        res.status(200).send(result);
      }
    })
  // )

  // @desc DELETE school
  // @route DELETE /schools/:schoolId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:userId/:schoolId',
    authMiddleware,
    loggedUserGuard,
    // roleMiddleware(rolesEnum.admin),
    errorHandler(async (req: Request, res: Response) => {
      const { schoolId, userId } = req.params;
      const { role } = req.user;
      const isProfileOwner = +userId === req.user.userId;

      const { error, school } = await schoolsServices.deleteSchool(schoolsData)(
        +schoolId,
        isProfileOwner,
        role
      );
      if (error === errors.RECORD_NOT_FOUND) {
        res.status(404).send({
          message: 'A school with this id is not found!'
        });
      } else if (error === errors.OPERATION_NOT_PERMITTED) {
        res.status(403).send({
          message: 'You are not authorized to delete this school.'
        });
      } else {
        res.status(200).send(school);
      }
    })
  );
  

export default schoolsController;
