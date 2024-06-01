import express, { Request, Response, NextFunction } from 'express';
import {} from '../controllers/projectController';
import { validateJWT } from '../controllers/authController';

const router = express.Router();

router.post(
	'/addConnectionString',
	validateJWT,
	addDBConnectionString,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(201).json(res.locals.db);
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

router.delete(
	`/deleteConnectionString/:dbId/:projectId`,
	validateJWT,
	deleteConnectionStringById,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.projectDBs);
	}
);

export default router;
