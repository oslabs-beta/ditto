import { Request, Response, NextFunction } from 'express';
import { addDBConnection, getDBConnectionByUserId } from '../models/userDB';

export const addDBConnectionString = async (req: Request, res: Response, next: NextFunction) => {
    const { db_name, connection_string } = req.body;
    const userId = req.user?.id;

    if(!userId) {
        return res.status(401).json({ error: 'Unauthorized ' })
    }
    try {
        const newDB = await addDBConnection(userId, db_name, connection_string);
        res.status(201).json({ message: 'Connection string added successfully', newDB });
    } catch (error) {
        next(error);
    }
};

export const getConnectionString = async (req: Request, res:Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
        const connectionStrings = await getDBConnectionByUserId(userId);
        res.status(200).json({ connectionStrings });
    } catch (error) {
        next(error);
    }
};