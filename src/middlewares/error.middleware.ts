// error-handler.ts

import { NextFunction, Request, Response } from 'express';

interface ErrorWithStatusCode extends Error {
   statusCode?: number;
}

/**
 * Global error handling middleware for the application.
 */
export const errorHandler = (err: ErrorWithStatusCode, _req: Request, res: Response, next: NextFunction): void => {
   const statusCode = err.statusCode || 500;
   const response = {
      isSuccess: false,
      code: statusCode,
      message: err.message || 'Internal Server Error',
      data: null,
   };

   res.status(statusCode).json(response);
   next();
};
