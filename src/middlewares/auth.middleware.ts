import { config } from '../config';
import { messages } from '../constants';
import { UserModal } from '../interfaces';
import { User } from '../models'; // Ensure the correct path and model type
import { ApiError, asyncHandler } from '../utils';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * Middleware to verify JWT and authenticate user.
 */
export const verifyJWT: RequestHandler = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
   const token: string | undefined = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

   if (!token || !config.ACCESS_TOKEN_SECRET) {
      throw new ApiError(401, messages.GENERAL.UNAUTHORIZED);
   }

   try {
      const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET as string) as JwtPayload;

      // Adjust this to match your User schema
      const user: UserModal | null = await User.findById(decodedToken._id);
      if (!user) {
         throw new ApiError(401, messages.GENERAL.INVALID_TOKEN);
      }

      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(401, (error as Error)?.message || messages.GENERAL.INVALID_TOKEN);
   }
});
