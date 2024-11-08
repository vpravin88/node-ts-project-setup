import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';
import { version } from '../../package.json';

const swaggerOptions = {
   openapi: '3.0.0',
   info: {
      title: 'node-ts-project-setup API documentation',
      version,
      license: {
         name: 'MIT',
         url: 'https://github.com/vpravin88/node-ts-project-setup/blob/main/LICENSE',
      },
   },
   servers: [
      {
         url: `http://localhost:${config.port}/v1`,
      },
   ],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export default swaggerSpecs;
