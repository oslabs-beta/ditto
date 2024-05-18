
import express from 'express';
import { addDBConnectionString, getConnectionString } from '../controllers/dbController';
import { validateJWT } from '../controllers/authController';

const router = express.Router();

router.post('/addConnectionString', validateJWT, addDBConnectionString);
router.get('/connectionStrings', validateJWT, getConnectionString);

export default router;
