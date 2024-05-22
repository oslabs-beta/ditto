import db from '../db';

export interface migrationLog {
	migration_id: number;
	user_id: number;
	date_created: string;
	database_id: number;
	description: string;
	status: string;
	version: number;
	script: string;
	checksum: string;
	executed_at: string;
}

export const createMigrationLogQuery = async (
	userId: number,
	dbId: number,
	version: number,
	script: string,
	executedAt: string,
	description?: string
): Promise<migrationLog> => {
	const queryString = `
    INSERT INTO migration_logs (user_id, database_id, version, script, executed_at, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
	const result = await db.query(queryString, [
		userId,
		dbId,
		version,
		script,
		executedAt,
		description || '',
	]);
	return result[0] as migrationLog;
};

export const updateMigrationLogQuery = async (
	migrationId: number,
	status: string,
	version: string,
	script: string,
	description?: string
): Promise<migrationLog> => {
	const queryString = `
    UPDATE migration_logs
    SET
			status = $2,
      version = $3,
      script = $4,
      description = $5
    WHERE migration_id = $1
    RETURNING *;
    `;
	const result = await db.query(queryString, [
		migrationId,
		status,
		version,
		script,
		description || '',
	]);
	return result[0] as migrationLog;
};

export const deleteMigrationLogQuery = async (
	migrationId: number
): Promise<number> => {
	const queryString = `
    DELETE FROM migration_logs
    WHERE migration_id = $1
    RETURNING database_id;
    `;
	const result = await db.query(queryString, [migrationId]);
	return result[0].database_id as number;
};

export const getMigrationLogQuery = async (
	migrationId: string | number,
	userId: string | number
): Promise<migrationLog> => {
	const queryString = `
	SELECT *
	FROM migration_logs
	WHERE migration_id = $1 AND user_id = $2;
	`;
	const result = await db.query(queryString, [migrationId, userId]);
	return result[0] as migrationLog;
};

export const getMigrationLogQueryAll = async (
	dbId: number
): Promise<migrationLog[]> => {
	const queryString = `
	SELECT *
	FROM migration_logs
	WHERE database_id = $1;
	`;
	const result = await db.query(queryString, [dbId]);
	return result as migrationLog[];
};

export const addDBMigration = async (
	dbId: number,
	migrationId: number
): Promise<void> => {
	const queryString = `
	UPDATE databases
	SET migration_id = array_append(migration_id, $2)
	WHERE db_id = $1;
	`;
	await db.query(queryString, [dbId, migrationId]);
};

export const removeDBMigration = async (
	dbId: number,
	migrationId: number
): Promise<void> => {
	const queryString = `
	UPDATE databases
	SET migration_id = array_remove(migration_id, $2)
	WHERE db_id = $1;
	`;
	await db.query(queryString, [dbId, migrationId]);
};
