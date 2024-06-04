import express, { Request, Response } from 'express';
import { validateJWT } from '../controllers/authController';
import {
	createMigrationLog,
	updateMigrationLog,
	deleteMigrationLog,
	getMigrationLogAll,
	getMigrationLog,
} from '../controllers/migrationLogsController';

const router = express.Router();

router.post(
	'/:dbId',
	validateJWT,
	createMigrationLog,
	(req: Request, res: Response) => {
		res.status(201).json(res.locals.migrationLog);
	}
);

router.patch(
	'/:migrationId',
	validateJWT,
	updateMigrationLog,
	(req: Request, res: Response) => {
		res.status(200).json(res.locals.migrationLog);
	}
);

router.get(
	'/:migrationId',
	validateJWT,
	getMigrationLog,
	(req: Request, res: Response) => {
		res.status(200).json(res.locals.migrationLog);
	}
);

router.get(
	'/all/:dbId',
	validateJWT,
	getMigrationLogAll,
	(req: Request, res: Response) => {
		res.status(200).json(res.locals.migrationsArray);
	}
);

router.delete(
	'/:migrationId',
	validateJWT,
	deleteMigrationLog,
	(req: Request, res: Response) => {
		res.status(200).json(res.locals.migrationsArr);
	}
);

export default router;
