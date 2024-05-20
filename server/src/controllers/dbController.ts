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
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}
	try {
		const existingConnections = await getDBConnectionByUserId(userId);
		if (existingConnections) {
			const duplicate = existingConnections.find(
				db => db.connection_string === connection_string
			);

			if (duplicate) {
				return next({
					status: 400,
					message: 'Connection string already exists',
				});
			}
		}

		const newDB = await addDBConnection(connection_string);
		const newDBUser = await addDBConnectionToUser(db_name, newDB.db_id, userId);
		res.locals.message = `Connection string added successfully ${newDBUser.db_name}`;
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
		return next({
			status: 401,
			message: 'Unauthorized',
		});
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
		return next({
			status: 401,
			message: 'Unauthorized',
		});
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
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}
	try {
		const databaseName = await deleteDBConnectionById(userId, Number(dbId));
		console.log(databaseName);
		if (!databaseName) {
			return next({
				status: 404,
				message: 'Connection string not found',
			});
		}
		res.locals.message = `Successfully deleted database ${databaseName}`;
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in dbController getConnectionStringbyId: ${error}`,
		});
	}
};
