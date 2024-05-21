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
	const { version, script, executedAt, description } = req.body;

	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}

	try {
		const result = await createMigrationLogQuery(
			userId,
			parseInt(dbId),
			version,
			script,
			executedAt,
			description ? description : ''
		);
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
		const log = await getMigrationLogQuery(parseInt(migrationId), userId);
		const result = await updateMigrationLogQuery(
			parseInt(migrationId),
			log.status === 'Failed' || 'Success' ? 'Pending' : log.status,
			version ? version : log.version,
			script ? script : log.script,
			description ? description : log.description
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
		const result = await deleteMigrationLogQuery(parseInt(migrationId));
		await removeDBMigration(result, parseInt(migrationId));
		res.locals.deletedLog = `Migration log ${migrationId} successfully deleted.`;
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
