import db from '../db';

export interface DB {
	db_id: number;
	connection_string: string;
	created_at: string; // does this need to match and if so double check
	migration_id: number | null;
}

export interface ProjectDB {
	project_db_id: number;
	project_id: number;
	db_id: number;
	db_name: string;
}

export interface DBbyProjectId {
	connection_string: string;
	db_name: string;
	db_id: number;
}

export interface DBbyDBId {
	connection_string: string;
	migration_id: number[];
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

export const addDBConnectionToProject = async (
	db_name: string,
	db_id: number,
	project_id: number
): Promise<ProjectDB> => {
	const queryString = `
    INSERT INTO project_db (db_name, db_id, project_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
	const result = await db.query(queryString, [db_name, db_id, project_id]);
	return result[0] as ProjectDB;
};

export const getDBConnectionByProjectId = async (
	projectId: number
): Promise<DBbyProjectId[]> => {
	const queryString = `
    SELECT databases.connection_string, project_db.db_name, databases.db_id
		FROM databases
		JOIN project_db ON databases.db_id = project_db.db_id
		WHERE project_db.user_id = $1;
    `;
	const result = await db.query(queryString, [projectId]);
	return result as DBbyProjectId[];
};

export const getDBConnectionById = async (dbId: number): Promise<DBbyDBId> => {
	const queryString = `
		SELECT connection_string, migration_id
		FROM databases 
		JOIN project_db ON databases.db_id = project_db.db_id
		WHERE project_db.db_id = $1;
		`;
	const result = await db.query(queryString, [dbId]);
	return result[0] as DBbyDBId;
};

export const deleteDBConnectionById = async (
	projectId: number,
	dbId: number
): Promise<string> => {
	const queryString = `
		DELETE FROM project_db
		WHERE project_id = $1 AND db_id = $2
		RETURNING db_id;
		`;
	const result = await db.query(queryString, [projectId, dbId]);
	return result[0] as string;
};
