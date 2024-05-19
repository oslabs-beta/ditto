import { Request, Response, NextFunction } from 'express';
import { addDBConnection, getDBConnectionByUserId , getDBConnectionById} from '../models/userDB';

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
        const existingConnections = await getDBConnectionByUserId(userId);
        const duplicate = existingConnections.find(db => db.connection_string === connection_string);

        if (duplicate) {
            return next({
                status: 400,
                message: 'Connection string already exists',
            });
        }

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

    if(!userId) {
        return next({
            status:401,
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
        res.locals.connectionString = connectionString;
        return next();
    } catch(error) {
        next({
            status: 400,
            message: `Error in dbController getConnectionStringbyId: ${error}`,
        });
    }
}

