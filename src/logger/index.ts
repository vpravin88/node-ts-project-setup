import path from 'path';
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
   level: 'info',
   format: format.combine(format.timestamp(), format.json()),
   transports: [
      new transports.Console(),
      new transports.File({
         filename: path.join(__dirname, '../../', 'error.log'),
         level: 'error',
      }),
      new transports.File({
         filename: path.join(__dirname, '../../', 'combined.log'),
      }),
   ],
});

export default logger;
