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
import { generateChecksum } from '../models/userDB';
/*
1. user puts in description, version, and script (req.body)
2. create a migration log when they click on 'save'
3. generate and store checksum based on script
4. when user runs migrations, only migrations with status pending will be run
5. when a script is successful, update the status of corresponding migration log
6. option to delete and edit any migrations that don't have status of success
7. if a migration fails and user changes the script, update status back to pending
8. user will not be able to edit any migrations that have status of success
*/

export const createMigrationLog = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	const { dbId } = req.params;
	const { version, script, description } = req.body;
	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const checksum = generateChecksum(script);
		const result = await createMigrationLogQuery(
			userId,
			parseInt(dbId),
			version,
			script,
			// executedAt,
			checksum,
			description ? description : ''
		);
		console.log('creation migration log');
		await addDBMigration(parseInt(dbId), result.migration_id);
		console.log('Successfully added migration_id into databases table');
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
		const log = await getMigrationLogQuery(migrationId, userId);
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
		const log = await getMigrationLogQuery(migrationId, userId);
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
		await removeDBMigration(dbId, parseInt(migrationId)); // updating migration_id in databases table
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
