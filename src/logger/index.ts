import path from 'path';
import { createLogger, transports, format } from 'winston';
import config from '../config';

// Helper format for better error handling in logs
const enumerateErrorFormat = format((info) => {
   if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
   }
   return info;
});

// Define the custom format for logging (without colorization in file logs)
const logFormat = format.printf(({ level, message, method, route, timestamp }) => {
   let logger = `${timestamp} [${level}]`;
   if (method) logger += ` [${method}]`;
   if (route) logger += ` [${route}]`;
   logger += ` ${message}`;
   return logger;
});

// Define the base logger configuration
const logger = createLogger({
   level: config?.NODE_ENV === 'development' ? 'debug' : 'info',
   format: format.combine(
      enumerateErrorFormat(),
      format.timestamp(),
      format.splat(), // to handle additional fields like `method`, `route`
      config?.NODE_ENV === 'development' ? format.colorize() : format.uncolorize(), // Colorize in dev only
      logFormat,
   ),
   transports: [
      // Console transport for development (with colorized output)
      new transports.Console({
         stderrLevels: ['error'],
      }),

      // File transport for error logs (without colorization)
      new transports.File({
         filename: path.join(__dirname, '../../logs', 'error.log'),
         level: 'error',
      }),

      // File transport for combined logs (without colorization)
      new transports.File({
         filename: path.join(__dirname, '../../logs', 'combined.log'),
      }),
   ],
});

// Export as default and named export for flexible imports
export default logger;
