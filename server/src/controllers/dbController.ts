import { Request, Response, NextFunction } from 'express';
import { addDBConnection, getDBConnectionByUserId } from '../models/userDB';

export const addDBConnectionString = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { db_name, connection_string } = req.body;
	const userId = req.user?.id;

	if (!userId) {
		return next({
			status: 401,
			message: 'Unauthorized',
		});
	}
	try {
		const newDB = await addDBConnection(userId, db_name, connection_string);
		res.locals.message = `Connection string added successfully ${newDB}`;
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
		res.locals.connectionStrings = { connectionStrings };
	} catch (error) {
		return next({
			status: 400,
			message: `Error in dbController getConnectionString: ${error}`,
		});
	}
};
