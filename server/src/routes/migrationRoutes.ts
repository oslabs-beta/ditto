import express, { Request, Response, NextFunction } from 'express';
import { executeMigration } from '../controllers/engineController';
import { validateJWT } from '../controllers/authController';

const router = express.Router();

// router.post('/', (req: Request, res: Response) => {
// 	res.sendStatus(201);
// });

router.post(
	'/',
	validateJWT,
	executeMigration,
	(req: Request, res: Response) => {
		res.status(201).json({ message: res.locals.message });
	}
);

router.patch('/:logId', (req: Request, res: Response) => {
	res.sendStatus(200);
});

export default router;
