import { query } from 'express';
import db from '../db';

export interface DB {
	db_id: number;
	db_name: string;
	connection_string: string;
	created_at: Date; // does this need to match and if so double check
	user_id: number;
	migration_id: number | null;
}

export interface UserDB {
	user_db_id: number;
	user_id: number;
	db_id: number;
	date_added: Date; //depends how Jay worded these variables
}

export const addDBConnection = async (
	userId: number,
	dbName: string,
	connectionString: string
): Promise<DB> => {
	const queryString = `
    INSERT INTO databases (db_name, connection_string, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
	const result = await db.query(queryString, [
		dbName,
		connectionString,
		userId,
	]);
	return result[0] as DB;
};

export const getDBConnectionByUserId = async (
	userId: number
): Promise<DB[]> => {
	const queryString = `
    SELECT * FROM databases WHERE user_id = $1;
    `;
	const result = await db.query(queryString, [userId]);
	return result as DB[];
};

export const getDBConnectionById = async (
	userId: number,
	dbId: number
): Promise<DB | null> => {
	const queryString = `
        SELECT * FROM databases WHERE user_id = $1 AND db_id = $2;
        `;
	const result = await db.query(queryString, [userId, dbId]);
	return result.length > 0 ? (result[0] as DB) : null;
};

export const deleteDBConnectionById = async (
	userId: number,
	dbId: number
): Promise<DB | null> => {
	const queryString = `
			DELETE FROM databases
			WHERE user_id = $1 AND db_id = $2
			RETURNING db_name
			`;
	const result = await db.query(queryString, [userId, dbId]);
	return result.length > 0 ? (result[0] as DB) : null;
};
