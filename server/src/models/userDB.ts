import db from '../db';
import crypto from 'crypto';

export interface DB {
	db_id: number;
	connection_string: string;
	created_at: string; 
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
	db_id: number;
}

export interface DBbyDBId {
	connection_string: string;
	migration_id: number[];
}

export interface Migration {
	migration_id: number;
	user_id: number;
	date_created: number;
	database_id: number;
	description: string;
	status: string;
	version: string;
	script: string;
	checksum: string;
}

export const addDBConnection = async (
	connectionString: string
): Promise<DB> => {
	const queryString = `
			WITH inserted_row AS (
			INSERT INTO databases (connection_string)
			VALUES ($1)
			ON CONFLICT (connection_string) DO NOTHING
			RETURNING db_id
		)
		SELECT db_id FROM inserted_row
		UNION ALL
		SELECT db_id FROM databases WHERE connection_string = $1;
    `;
	const result = await db.query(queryString, [connectionString]);
	return result[0] as DB;
};

export const getPendingMigrations = async (
	userId: number,
	dbId: number
): Promise<Migration[]> => {
	const queryString = `
	SELECT * FROM migration_logs
	WHERE user_id = $1 AND database_id = $2 AND status = 'Pending'
	ORDER BY CAST(version AS INTEGER) ASC; 
	`; 
	console.log('pendingMigration queryString:', queryString);
	const result = await db.query(queryString, [userId, dbId]);
	console.log('pending Migration result:', result);
	return result as Migration[]; 
};

export const updateMigrationStatus = async (
	migrationId: number,
	status: string
): Promise<Migration> => {
	const queryString = `
	UPDATE migration_logs
	SET status = $1, executed_at = timezone('America/New_York'::text, date_trunc('second'::text, now()))
	WHERE migration_id = $2
	RETURNING *;
	`;
	const result = await db.query(queryString, [status, migrationId]);
	return result[0] as Migration; 
};

// export const validateChecksum = async (
// 	migrationId: number,
// 	checksum: string
// ): Promise<boolean> => {
// 	const queryString = `
// 	SELECT checksum FROM migration_logs
// 	WHERE migration_id = $1;
// 	`;
// 	const result = await db.query(queryString, [migrationId]);
// 	if (result.length > 0) {
// 		const storedChecksum = result[0].checksum;
// 		return checksum === storedChecksum; 
// 	}
// 	return false;
// };

// export const generateChecksum = (script: string): string => {
// 	const hash = crypto.createHash('sha256');
// 	hash.update(script);
// 	return hash.digest('hex');
// };
