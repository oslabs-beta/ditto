import { Request, Response, NextFunction } from 'express';
import {
	addDBConnection,
	getDBConnectionByProjectId,
	getDBConnectionById,
	deleteDBConnectionById,
	addDBConnectionToProject,
} from '../models/dbModels';

export const addDBConnectionString = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { db_name, connection_string, projectId } = req.body;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const existingConnections = await getDBConnectionByProjectId(projectId);
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
		await addDBConnectionToProject(db_name, newDB.db_id, projectId);
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
	const { projectId } = req.params;
	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const connectionStrings = await getDBConnectionByProjectId(
			Number(projectId)
		);
		res.locals.connectionStrings = connectionStrings; 
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
	const { dbId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const connectionString = await getDBConnectionById(Number(dbId));
		if (!connectionString) {
			return next({
				status: 404,
				message: 'Connection string not found',
			});
		}
		res.locals.connectionString = connectionString; 
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
	const { dbId, projectId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		await deleteDBConnectionById(Number(projectId), Number(dbId));
		const projectDBs = await getDBConnectionByProjectId(Number(projectId));
		res.locals.projectDBs = projectDBs;
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in dbController getConnectionStringbyId: ${error}`,
		});
	}
};
