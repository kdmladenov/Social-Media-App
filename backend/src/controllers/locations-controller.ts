import express, { Request, Response } from 'express';


import rolesEnum from '../constants/roles.enum.js';
import { paging } from '../constants/constants.js';
import errorHandler from '../middleware/errorHandler.js';
import locationsServices from '../services/locations-services.js';
import locationsData from '../data/locations-data.js';
import RequestQuery from '../models/RequestQuery.js';


const locationsController = express.Router();

locationsController
  // TODO
  // @desc Get all locations
  // @route GET /locations
  // @access Public
  .get(
    '/',
    errorHandler(async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
      const { search = '', sort = 'sort=user_id asc' } = req.query;
      let { pageSize = paging.DEFAULT_LOCATIONS_PAGESIZE, page = paging.DEFAULT_PAGE } = req.query;

      if (+pageSize > paging.MAX_LOCATIONS_PAGESIZE) pageSize = paging.MAX_LOCATIONS_PAGESIZE;
      if (+pageSize < paging.MIN_LOCATIONS_PAGESIZE) pageSize = paging.MIN_LOCATIONS_PAGESIZE;
      if (page < paging.DEFAULT_PAGE) page = paging.DEFAULT_PAGE;

      const result = await locationsServices.getAllLocations(locationsData)(
        search,
        sort,
        +page,
        +pageSize
      );

      res.status(200).send(result);
    })
  );
  
  

export default locationsController;
