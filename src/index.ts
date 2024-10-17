import dotenv from 'dotenv';
import { httpServer } from './app';
// import connectDB from "./db";
import path from 'path';
import { config } from './config';
import logger from './logger';

dotenv.config({ path: path.join(__dirname, '../.env') });

httpServer.listen(config.port, () => {
   //   logger.info(`Server running on port ${config.port}`);
   logger.info(`Server is running on http://localhost:${config.port}`);
   logger.info(`Swagger docs available at http://localhost:${config.port}/api/v1/swagger`);
});
