import express, { Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import { getConnectionString } from '../controllers/dbController';

const router = express.Router();

router.post(
	'/register',
	register,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(201).json(res.locals.message);
	}
);
router.post(
	'/login',
	login,
	getConnectionString,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.connectionStrings);
	}
);

export default router;
