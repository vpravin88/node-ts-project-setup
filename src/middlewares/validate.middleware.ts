// validate.ts

import { Request, Response, NextFunction } from 'express';
import Joi, { SchemaMap } from 'joi';
import { ApiError, pick } from '../utils';

/**
 * Middleware to validate request data against a Joi schema.
 * @param schema - Joi validation schema for request fields.
 * @returns Express middleware function.
 */
const validate =
   (schema: SchemaMap) =>
   (req: Request, _res: Response, next: NextFunction): void => {
      const validationObject = pick(req, Object.keys(schema));
      const { value, error } = Joi.compile(schema)
         .prefs({ errors: { label: 'key' }, abortEarly: false })
         .validate(validationObject);

      if (error) {
         const message = error.details.map((detail) => detail.message).join(', ');
         return next(new ApiError(400, message));
      }

      Object.assign(req, value); // Merge validated values into the request object
      return next();
   };

export default validate;
