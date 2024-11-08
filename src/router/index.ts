import express from 'express';
import swagger from './swagger.route';

const router = express.Router();

router.use('/swagger', swagger);

export default router;
