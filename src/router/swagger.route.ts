import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from '../docs/swagger';

const router = express.Router();

const specs = swaggerJSDoc({
   swaggerSpecs,
   apis: ['src/docs/*.yml', 'src/routes/*.js'],
});

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(specs, { explorer: true }));
export default router;
