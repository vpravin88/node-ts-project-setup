// async-handler.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * A higher-order function to wrap async request handlers and pass errors to the next middleware.
 * @param requestHandler - The async Express request handler function.
 * @returns A wrapped request handler function with error handling.
 */
const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
   return (req: Request, res: Response, next: NextFunction): void => {
      Promise.resolve(requestHandler(req, res, next)).catch(next);
   };
};

export default asyncHandler;
