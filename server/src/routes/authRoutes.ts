import express, { Request, Response, NextFunction } from 'express';
import { register, login, validateJWT } from '../controllers/authController';
import { getConnectionString } from '../controllers/dbController';

const router = express.Router();

router.post(
	'/register',
	register,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(201).json(res.locals.userId);
	}
);
router.post(
	'/login',
	login,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.token);
	}
);

// router.post(
// 	'/login',
// 	login,
// 	(_req: Request, res: Response, _next: NextFunction) => {
// 		res.status(200).json(res.locals.token);
// 	}
// );
export default router;
