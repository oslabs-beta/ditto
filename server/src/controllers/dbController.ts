import { Request, Response, NextFunction } from 'express';
import {
	addDBConnection,
	getDBConnectionByUserId,
	getDBConnectionById,
	deleteDBConnectionById,
	addDBConnectionToUser,
} from '../models/userDB';

export const addDBConnectionString = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { db_name, connection_string } = req.body;
	//get user ID from req object from validateJWT middleware
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const existingConnections = await getDBConnectionByUserId(userId);
		if (existingConnections) {
			const duplicate = existingConnections.find(
				db => db.connection_string === connection_string
			);

			if (duplicate) {
				console.log('Connection string already exists');
				return res.sendStatus(400);
			}
		}

		const newDB = await addDBConnection(connection_string);
		await addDBConnectionToUser(db_name, newDB.db_id, userId);
		res.locals.db = { connection_string, db_name, db_id: newDB.db_id };
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in dbController addDBConnectionString: ${error}`,
		});
	}
};

export const getConnectionString = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const connectionStrings = await getDBConnectionByUserId(userId);
		res.locals.connectionStrings = connectionStrings; // { connection_string, db_name }
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in dbController getConnectionString: ${error}`,
		});
	}
};

export const getConnectionStringById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//get DB ID from req params
	const { dbId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const connectionString = await getDBConnectionById(userId, Number(dbId));
		if (!connectionString) {
			return next({
				status: 404,
				message: 'Connection string not found',
			});
		}
		res.locals.connectionString = connectionString; // { connection_string, migration_id (array) }
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in dbController getConnectionStringbyId: ${error}`,
		});
	}
};

export const deleteConnectionStringById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { dbId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		await deleteDBConnectionById(userId, Number(dbId));
		const userDBs = await getDBConnectionByUserId(userId);
		res.locals.userDBs = userDBs;
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in dbController getConnectionStringbyId: ${error}`,
		});
	}
};
