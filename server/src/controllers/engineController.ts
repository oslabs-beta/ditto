import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import db from '../db';
import {
	getPendingMigrations,
	updateMigrationStatus,
	// validateChecksum,
} from '../models/userDB';
import { getDBConnectionByProjectId } from '../models/dbModels';

export const createPool = (connectionString: string) => {
	return new Pool({
		connectionString,
		ssl: {
			rejectUnauthorized: false,
		},
	});
};

export const migrationScript = async (
	script: string,
	pool: Pool
): Promise<void> => {
	let client;
	try {
		client = await pool.connect();
		await client.query(script);
	} catch (error: any) {
		console.error('Error executing migration', error.message);
		throw new Error(`Error executing migration: ${error.message}`);
	} finally {
		if (client) {
			client.release();
		}
	}
};

export const executeMigration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let { dbId, projectId } = req.body;
	const userId = req.user?.id;

	if (!dbId || !userId) {
		return next({
			status: 400,
			message: { err: 'DatabaseID and userID required.' },
		});
	}
	dbId = Number(dbId);

	try {
		const connectionStrings = await getDBConnectionByProjectId(projectId);
		console.log(connectionStrings);
		const connectionString = connectionStrings.find(
			db => db.db_id === dbId
		)?.connection_string;
		if (!connectionString) {
			return next({
				status: 404,
				message: { error: 'Connection string not found.' },
			});
		}

		const pool = createPool(connectionString);
		const pendingMigrations = await getPendingMigrations(userId, dbId);

		for (const migration of pendingMigrations) {
			// uncomment once checksum is implemented
			// const validChecksum = await validateChecksum(
			// 	migration.migration_id,
			// 	migration.checksum
			// ); //valdiate checksum for each migration
			// if (!validChecksum) {
			// 	await updateMigrationStatus(migration.migration_id, 'Failed'); // if checksum is invalid, then update status to failed
			// 	return res.status(400).json({
			// 		error: `Invalid checksum for migration ${migration.version}`,
			// 	});
			// }

			try {
				await migrationScript(migration.script, pool);
				await updateMigrationStatus(migration.migration_id, 'Success');
			} catch (error) {
				await updateMigrationStatus(migration.migration_id, 'Failed'); // update status to failed if execution is not successful
			}
		}
		const allMigrations = await db.query(
			`
		SELECT * FROM migration_logs
		WHERE user_id = $1 AND database_id = $2
		ORDER BY CAST(version AS INTEGER) ASC;
		`,
			[userId, dbId] // an example of preventing SQL injection
		);
		console.log('all migrations: ', allMigrations);
		res.status(201).json(allMigrations); //this makes sure our state is the same as it was
	} catch (error) {
		return next({
			status: 500,
			message: `Error in engineController.executeMigration ${error}.`,
		});
	}
};
