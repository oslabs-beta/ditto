import {
	getDBConnectionByUserId,
	getPendingMigrations,
	updateMigrationStatus,
	validateChecksum,
} from '../models/userDB';
import { Pool } from 'pg';
import { Request, Response, NextFunction } from 'express';

const createPool = (connectionString: string) => {
	return new Pool({
		connectionString,
		ssl: {
			rejectUnauthorized: false,
		},
	});
};

const migrationScript = async (script: string, pool: Pool): Promise<void> => {
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
	const { dbId } = req.body;
	const userId = req.user?.id;

	if (!dbId || !userId) {
		return next({
			status: 400,
			message: { err: 'DatabaseID and userID required.' },
		});
	}

	try {
		const connectionStrings = await getDBConnectionByUserId(userId); // get db connections from user
		const connectionString = connectionStrings.find(
			db => db.db_id === dbId
		)?.connection_string; // get specific string by specific db id

		if (!connectionString) {
			return next({
				status: 404,
				message: { error: 'Connection string not found.' },
			});
		}

		const pool = createPool(connectionString);
		const pendingMigrations = await getPendingMigrations(userId, dbId); // get all pending status migrations for user/dbid

		for (const migration of pendingMigrations) {
			//iterate through all the migrations
			const validChecksum = await validateChecksum(
				migration.migration_id,
				migration.checksum
			); //valdiate checksum for each migration
			if (!validChecksum) {
				await updateMigrationStatus(migration.migration_id, 'failed'); // if checksum is invalid, then update status to failed
				return next({
					status: 400,
					message: `Invalid checksum for migration ${migration.version}`,
				});
			}

			try {
				await migrationScript(migration.script, pool); //still iterating so execute each migration script
				await updateMigrationStatus(migration.migration_id, 'success'); // update status to success if execution is successful
			} catch (error) {
				await updateMigrationStatus(migration.migration_id, 'failed'); // update status to failed if execution is not successful
				return next({
					status: 500,
					message: `Error executing migration ${migration.version}`,
				});
			}
		}
		res.locals.message = 'Migrations executed successfully';
		return next();
	} catch (error) {
		return next({
			status: 500,
			message: `$Error in engineController.executeMigration ${error}.`,
		});
	}
};
