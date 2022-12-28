import { NextFunction, Request, Response } from 'express';
import errorStrings from '../constants/error-strings.js';

export default (resource: string, scheme: { [key: string]: Function }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const errors: { [key: string]: string } = {};
    const errorsObj: { [key: string]: { [key: string]: string } } = errorStrings;

    Object.keys(scheme).forEach((key) => {
      // if (!scheme[key](req?.file?.[key])) {
      //   errors[key] = errorsObj?.[resource]?.[key];
      // }
            if (!scheme.size(req?.file?.size)) {
              errors[key] = errorsObj?.[resource]?.size;
            }
            if (!scheme.type(req?.file?.mimetype)) {
              errors[key] = errorsObj?.[resource]?.type;
            }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
