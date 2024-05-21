import express, { Request, Response, NextFunction } from 'express';
import {
	addDBConnectionString,
	getConnectionString,
	getConnectionStringById,
	deleteConnectionStringById,
} from '../controllers/dbController';
import { validateJWT } from '../controllers/authController';

const router = express.Router();

router.post(
	'/addConnectionString',
	validateJWT,
	addDBConnectionString,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(201).json(res.locals.message);
	}
);
router.get(
	'/connectionStrings',
	validateJWT,
	getConnectionString,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.connectionStrings);
	}
);

// router.get(
// 	`/getConnectionString/:dbId`,
// 	validateJWT,
// 	getConnectionStringById,
// 	(_req: Request, res: Response, _next: NextFunction) => {
// 		res.status(200).json(res.locals.connectionString);
// 	}
// );
// go see migrationLogRoutes

router.delete(
	`/deleteConnectionString/:dbId`,
	validateJWT,
	deleteConnectionStringById,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.message);
	}
);

export default router;
