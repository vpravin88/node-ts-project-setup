import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './config';

const swaggerOptions = {
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'Node API',
         version: '1.0.0',
         description: 'API documentation for the Node API',
      },
      servers: [
         {
            url: `http://localhost:${config.port}`,
         },
      ],
   },
   apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export default swaggerSpecs;
