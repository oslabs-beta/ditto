import db from '../db';
import crypto from 'crypto';

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

// export const addDBConnectionToUser = async (
// 	db_name: string,
// 	db_id: number,
// 	user_id: number
// ): Promise<UserDB> => {
// 	const queryString = `
//     INSERT INTO user_db (db_name, db_id, user_id)
//     VALUES ($1, $2, $3)
//     RETURNING *;
//     `;
// 	const result = await db.query(queryString, [db_name, db_id, user_id]);
// 	return result[0] as UserDB;
// };

// export const getDBConnectionByUserId = async (
// 	userId: number
// ): Promise<DBbyUserId[]> => {
// 	const queryString = `
//     SELECT databases.connection_string, user_db.db_name, databases.db_id
// 		FROM databases
// 		JOIN user_db ON databases.db_id = user_db.db_id
// 		WHERE user_db.user_id = $1;
//     `;
// 	const result = await db.query(queryString, [userId]);
// 	return result as DBbyUserId[];
// };

// export const getDBConnectionById = async (
// 	userId: number,
// 	dbId: number
// ): Promise<DBbyDBId> => {
// 	const queryString = `
// 		SELECT connection_string, migration_id
// 		FROM databases
// 		JOIN user_db ON databases.db_id = user_db.db_id
// 		WHERE user_db.user_id = $1 AND user_db.db_id = $2;
// 		`;
// 	const result = await db.query(queryString, [userId, dbId]);
// 	return result[0] as DBbyDBId;
// };

// export const deleteDBConnectionById = async (
// 	userId: number,
// 	dbId: number
// ): Promise<string> => {
// 	const queryString = `
// 		DELETE FROM user_db
// 		WHERE user_id = $1 AND db_id = $2
// 		RETURNING db_name;
// 		`;
// 	const result = await db.query(queryString, [userId, dbId]);
// 	return result[0] as string;
// };

export const getPendingMigrations = async (
	userId: number,
	dbId: number
): Promise<Migration[]> => {
	const queryString = `
	SELECT * FROM migration_logs
	WHERE user_id = $1 AND database_id = $2 AND status = 'Pending'
	ORDER BY CAST(version AS INTEGER) ASC; 
	`; // make sure version is set to an integer
	console.log('pendingMigration queryString:', queryString);
	const result = await db.query(queryString, [userId, dbId]);
	console.log('pending Migration result:', result);
	return result as Migration[]; // return result as an array of migrations
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
	return result[0] as Migration; // return updated migration
};

export const validateChecksum = async (
	migrationId: number,
	checksum: string
): Promise<boolean> => {
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
};

export const generateChecksum = (script: string): string => {
	const hash = crypto.createHash('sha256');
	hash.update(script);
	return hash.digest('hex');
};
