import express, { Request, Response } from 'express';
import { executeMigration } from '../controllers/engineController';
import { validateJWT } from '../controllers/authController';

const router = express.Router();


router.post(
	'/',
	validateJWT,
	executeMigration
);

router.patch('/:logId', (req: Request, res: Response) => {
	res.sendStatus(200);
});

export default router;
