import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware';
import { ApiError } from './utils';
import path from 'path';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from './swagger';
import passport from 'passport';
import { createServer } from 'http';

dotenv.config({
   path: path.join(__dirname, '../.env'),
});

const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 500,
   standardHeaders: true,
   legacyHeaders: false,
   handler: (_, __, ___, options) => {
      throw new ApiError(
         options.statusCode || 500,
         `There are too many requests. You are only allowed ${options.max} requests per ${options.windowMs / 60000} minutes`,
         null,
      );
   },
});

app.use(limiter);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// app.use("/api/v1", router);

app.use('api/v1/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use(errorHandler);

export { httpServer };

// app.listen(config.port, () => {
//   logger.info(`Server running on port ${config.port}`);
// });
