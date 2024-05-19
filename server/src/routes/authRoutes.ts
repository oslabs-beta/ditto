import express, { Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';

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
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.message);
	}
);

export default router;
