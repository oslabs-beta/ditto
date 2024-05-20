import { getDBConnectionByUserId } from '../models/userDB';
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
	const { script, dbName } = req.body;
	const userId = req.user?.id; // depends on how we request the string like req.user or req.authuser???

	if (!script || !dbName || !userId) {
		return next({
			status: 400,
			message: { err: 'Script, databaseID, userID required.' },
		});
	}

	try {
		const connectionStrings = await getDBConnectionByUserId(userId);
		const connectionString = connectionStrings.find(
			db => db.db_name === dbName
		)?.connection_string;

		if (!connectionString) {
			return next({
				status: 404,
				message: { error: 'Connection string not found.' },
			});
		}

		const pool = createPool(connectionString);
		await migrationScript(script, pool);
		return next();
	} catch (error) {
		next({
			message: `$Error in engineController.executeMigration ${error}.`,
		});
	}
};
