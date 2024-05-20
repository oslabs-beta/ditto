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

export interface Migration {
	migration_id: number;
	user_id: number
	date_created: number;
	database_id: number
	description: string;
	status: string;
	version: string;
	script: string;
	checksum: number;

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

export const getPendingMigrations = async (userId: number, dbId: number): Promise<Migration[]> => {
	const queryString = `
	SELECT * FROM migration_logs
	WHERE user_id = $1 AND database_id = $2 AND status = 'pending'
	ORDER BY version ASC; 
	`;
	
	const result = await db.query(queryString, [userId, dbId]);
	return result as Migration[]; // return result as an array of migrations 
};

export const updateMigrationStatus = async (migrationId: number, status: string): Promise<Migration> => {
	const queryString = `
	UPDATE migration_logs
	SET status = $1, executed_at = NOW()
	WHERE migration_id = $2
	RETURNING *;
	`;
	const result = await db.query(queryString, [status, migrationId]);
	return result[0] as Migration; // return updated migration
};

export const validateChecksum = async (migrationId: number, checksum: number): Promise<boolean> => {
	const queryString = `
	SELECT checksum FROM migration_logs
	WHERE migration_id = $1;
	`;
	const result = await db.query(queryString, [migrationId]);
	if (result.length > 0) {
		const storedChecksum = result[0].checksum;
		return checksum === storedChecksum; // compare provided checksum with stored checksum
	}
	return false;
}
