import { Request, Response, NextFunction } from 'express';
import {} from '../models/projects';

export const createNewProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { project_name, ownerId } = req.body;
	//get user ID from req object from validateJWT middleware
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
		const connectionString = await getDBConnectionById(Number(dbId));
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
