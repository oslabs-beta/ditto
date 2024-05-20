import db from '../db';

export interface DB {
	db_id: number;
	connection_string: string;
	created_at: string; // does this need to match and if so double check
	migration_id: number | null;
}

export interface UserDB {
	user_db_id: number;
	user_id: number;
	db_id: number;
	db_name: string;
}

export interface DBbyUserId {
	connection_string: string;
	db_name: string;
}

export interface DBbyDBId {
	connection_string: string;
	migration_id: number[];
}

export const addDBConnection = async (
	connectionString: string
): Promise<DB> => {
	const queryString = `
    INSERT INTO databases (connection_string)
    VALUES ($1)
    RETURNING *;
    `;
	const result = await db.query(queryString, [connectionString]);
	return result[0] as DB;
};

export const addDBConnectionToUser = async (
	db_name: string,
	db_id: number
): Promise<UserDB> => {
	const queryString = `
    INSERT INTO user_db (db_name, db_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
	const result = await db.query(queryString, [db_name, db_id]);
	return result[0] as UserDB;
};

export const getDBConnectionByUserId = async (
	userId: number
): Promise<DBbyUserId[]> => {
	const queryString = `
    SELECT databases.connection_string, user_db.db_name
		FROM databases
		JOIN user_db ON databases.db_id = user_db.db_id
		WHERE user_db.user_id = $1;
    `;
	const result = await db.query(queryString, [userId]);
	return result[0] as DBbyUserId[];
};

export const getDBConnectionById = async (
	userId: number,
	dbId: number
): Promise<DBbyDBId> => {
	const queryString = `
		SELECT connection_string, migration_id
		FROM databases 
		JOIN user_db ON databases.db_id = user_db.db_id
		WHERE user_db.user_id = $1 AND user_db.db_id = $2;
		`;
	const result = await db.query(queryString, [userId, dbId]);
	return result[0] as DBbyDBId;
};

export const deleteDBConnectionById = async (
	userId: number,
	dbId: number
): Promise<string> => {
	const queryString = `
		DELETE FROM user_db
		WHERE user_id = $1 AND db_id = $2
		RETURNING db_name;
		`;
	const result = await db.query(queryString, [userId, dbId]);
	return result[0] as string;
};
