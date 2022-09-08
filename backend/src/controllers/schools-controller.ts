import express, { Request, Response } from 'express';

import schoolsServices from '../services/schools-services.js';

import schoolsData from '../data/schools-data.js';

import validateBody from '../middleware/validate-body.js';
import loggedUserGuard from '../middleware/loggedUserGuard.js';
import errorHandler from '../middleware/errorHandler.js';

import { authMiddleware } from '../authentication/auth.middleware.js';

import updateSchoolSchema from '../validator/update-school-schema.js';
import createSchoolSchema from '../validator/create-school-schema.js';

import errors from '../constants/service-errors.js';
import usersData from '../data/users-data.js';
import locationsData from '../data/locations-data.js';

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
      const { error, schools } = await schoolsServices.getAllMySchools(schoolsData)(+userId);

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
    '/:schoolId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { schoolId } = req.params;
      const { role, userId } = req.user;

      const { error, school } = await schoolsServices.getSchoolById(schoolsData)(
        +schoolId,
        +userId,
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
    errorHandler(async (req: Request, res: Response) => {
      const data = req.body;
      const { userId } = req.user;
      const { school } = await schoolsServices.createSchool(
        schoolsData,
        usersData,
        locationsData
      )(data, +userId);

      res.status(201).send(school);
    })
  )
  // @desc EDIT schools by ID
  // @route PUT /schools/:schoolId
  // @access Private - Admin or Profile Owner
  .put(
    '/:schoolId',
    authMiddleware,
    loggedUserGuard,
    validateBody('school', updateSchoolSchema),
    errorHandler(async (req: Request, res: Response) => {
      const { schoolId } = req.params;
      const { role, userId } = req.user;
      const data = req.body;

      const { error, result } = await schoolsServices.updateSchool(
        schoolsData,
        usersData,
        locationsData
      )(+schoolId, +userId, role, data);

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
  )

  // @desc DELETE school
  // @route DELETE /schools/:schoolId
  // @access Private - Admin or the ProfileOwner
  .delete(
    '/:schoolId',
    authMiddleware,
    loggedUserGuard,
    errorHandler(async (req: Request, res: Response) => {
      const { schoolId } = req.params;
      const { role, userId } = req.user;

      const { error, school } = await schoolsServices.deleteSchool(schoolsData)(
        +schoolId,
        +userId,
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
