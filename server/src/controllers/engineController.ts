import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import db from '../db';
import {
	getDBConnectionByUserId,
	getPendingMigrations,
	updateMigrationStatus,
	validateChecksum,
	Migration,
} from '../models/userDB';


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
	console.log('I made it to executeMigration');
	let { dbId } = req.body;
	const userId = req.user?.id;

	if (!dbId || !userId) {
		return next({
			status: 400,
			message: { err: 'DatabaseID and userID required.' },
		});
	}
	dbId = Number(dbId);

	try {
		const connectionStrings = await getDBConnectionByUserId(userId); // get db connections from user
		console.log('connectionStrings:', connectionStrings);
		console.log('dbId:', dbId, 'typeof dbId:', typeof dbId);
		connectionStrings.forEach(db => {
			console.log('db_id:', db.db_id, 'typeof db_id:', typeof db.db_id);
		});
		const connectionString = connectionStrings.find(
			db => db.db_id === dbId
		)?.connection_string; // get specific string by specific db id
		console.log('one connection string:', connectionString);
		if (!connectionString) {
			return next({
				status: 404,
				message: { error: 'Connection string not found.' },
			});
		}

		const pool = createPool(connectionString);
		console.log('pool', pool);
		const pendingMigrations = await getPendingMigrations(userId, dbId); // get all pending status migrations for user/dbid
		console.log('pendingMigrations:', pendingMigrations);

		// if (pendingMigrations.length === 0) {
		// 	return res.status(200).json({ message: 'No pending migrations found.'});
		// }
		for (const migration of pendingMigrations) {
			//iterate through all the migrations
			const validChecksum = await validateChecksum(
				migration.migration_id,
				migration.checksum
			); //valdiate checksum for each migration
			if (!validChecksum) {
				await updateMigrationStatus(migration.migration_id, 'Failed'); // if checksum is invalid, then update status to failed
				return res.status(400).json({
					error: `Invalid checksum for migration ${migration.version}`,
				});
			}

			try {
				await migrationScript(migration.script, pool); //still iterating so execute each migration script
				await updateMigrationStatus(migration.migration_id, 'Success'); // update status to success if execution is successful
			} catch (error) {
				await updateMigrationStatus(migration.migration_id, 'Failed'); // update status to failed if execution is not successful
			}
		}
		// res.locals.message = 'Migrations executed successfully';
		// return next();
		const allMigrations = await db.query(
			`
		SELECT * FROM migration_logs
		WHERE user_id = $1 AND database_id = $2
		ORDER BY CAST(version AS INTEGER) ASC;
		`,
			[userId, dbId] // an example of preventing SQL injection 
		);
		res.status(201).json(allMigrations); //this makes sure our state is the same as it was 
	} catch (error) {
		return next({
			status: 500,
			message: `$Error in engineController.executeMigration ${error}.`,
		});
	}
};
