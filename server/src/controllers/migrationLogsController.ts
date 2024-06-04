import { Request, Response, NextFunction } from 'express';
import {
	createMigrationLogQuery,
	updateMigrationLogQuery,
	deleteMigrationLogQuery,
	getMigrationLogQuery,
	getMigrationLogQueryAll,
	addDBMigration,
	removeDBMigration,
} from '../models/migrationLog';
// import { generateChecksum } from '../models/userDB';

export const createMigrationLog = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { dbId } = req.params;
	const { version, script, description } = req.body;
	if (!userId) {
		return res.sendStatus(401);
	}
	try {
		// const checksum = generateChecksum(script);
		const result = await createMigrationLogQuery(
			userId,
			parseInt(dbId),
			version,
			script,
			// checksum,
			description ? description : ''
		);
		await addDBMigration(parseInt(dbId), result.migration_id);
		res.locals.migrationLog = result;
		return next();
	} catch (error) {
		return next({
			status: 400,
			messsage: `Error in migrationLogController createMigrationLog: ${error}`,
		});
	}
};

export const getMigrationLog = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { migrationId } = req.params;

	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const log = await getMigrationLogQuery(migrationId);
		res.locals.migrationLog = log;
		return next();
	} catch (error) {
		return next({
			status: 400,
			messsage: `Error in migrationLogController getMigrationLog: ${error}`,
		});
	}
};

export const updateMigrationLog = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { migrationId } = req.params;
	const { version, script, description } = req.body;

	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const log = await getMigrationLogQuery(migrationId);
		const result = await updateMigrationLogQuery(
			parseInt(migrationId),
			log.status !== script ? 'Pending' : log.status,
			version,
			script,
			description
		);
		res.locals.migrationLog = result;
		return next();
	} catch (error) {
		return next({
			status: 400,
			messsage: `Error in migrationLogController updateMigrationLog: ${error}`,
		});
	}
};

export const deleteMigrationLog = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { migrationId } = req.params;

	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const dbId = await deleteMigrationLogQuery(parseInt(migrationId));
		await removeDBMigration(dbId, parseInt(migrationId)); 
		const migrationsArr = await getMigrationLogQueryAll(dbId);
		res.locals.migrationsArr = migrationsArr;
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in migrationLogController deleteMigrationLog: ${error}`,
		});
	}
};

export const getMigrationLogAll = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { dbId } = req.params;
	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const result = await getMigrationLogQueryAll(parseInt(dbId));
		res.locals.migrationsArray = result;
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in migrationLogController deleteMigrationLog: ${error}`,
		});
	}
};
