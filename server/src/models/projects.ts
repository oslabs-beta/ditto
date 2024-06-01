import db from '../db';

export interface Project {
	date_created: string;
	project_name: string;
	project_id: number;
	owner: number;
}

export interface SelectedProject {
	project_name: string;
	user_id: number;
	project_id: number;
	role: string;
}

export const createProject = async (
	project_name: string,
	owner: number
): Promise<Project> => {
	const queryString = `
  INSERT INTO projects (project_name, owner)
  VALUES ($1, $2)
  RETURNING *;
  `;

	const result = await db.query(queryString, [project_name, owner]);
	const queryString2 = `
  INSERT INTO user_projects (project_name, user_id, project_id, role)
  VALUES ($1, $2, $3, $4);
  `;
	await db.query(queryString2, [
		project_name,
		owner,
		result[0].project_id,
		'Owner',
	]);
	return result[0] as Project;
};

export const deleteProject = async (project_id: number, owner: number) => {
	const queryString = `
  DELETE FROM projects
  WHERE project_id = $1 AND owner = $2
  RETURNING project_name;
  `;
	const result = await db.query(queryString, [project_id, owner]);
	return result[0] as string;
};

export const generateCode = async (
	code: string,
	project_id: number,
	owner: number
): Promise<void> => {
	const queryString = `
  UPDATE projects
  SET code = $1
  WHERE project_id = $2 AND owner = $3
  `;
	await db.query(queryString, [code, project_id, owner]);
	return;
};

export const joinProject = async (
	user: number,
	code: string
): Promise<void> => {
	const queryString = `
  SELECT *
  FROM projects
  WHERE code = $1;
  `;

	const queryString2 = `
  INSERT INTO user_projects (project_name, user_id, project_id, role)
  VALUES ($1, $2, $3, $4);
  `;

	const queryString3 = `
  UPDATE projects
  SET code = NULL
  WHERE code = $1;
  `;

	const result = await db.query(queryString, [code]);
	await db.query(queryString2, [
		result[0].project_name,
		user,
		result[0].project_id,
		'User',
	]);
	await db.query(queryString3, [code]);
	return;
};

export const leaveProject = async (
	user: number,
	project_id: number
): Promise<void> => {
	const queryString = `
  DELETE FROM user_projects
  WHERE user_id = $1 AND project_id = $2;
  `;
	await db.query(queryString, [user, project_id]);
	return;
};

export const getAllUsers = async (project_id: number): Promise<string[]> => {
	const queryString = `
  SELECT u.username
  FROM user_projects AS up
  JOIN users AS u ON up.user_id = u.user_id
  WHERE up.project_id = $1;
  `;
	const result = await db.query(queryString, [project_id]);
	return result as string[];
};

export const selectProject = async (
	project_id: number,
	user: number
): Promise<SelectedProject> => {
	const queryString = `
  SELECT *
  FROM user_projects
  WHERE project_id = $1 AND user_id = $2;
  `;
	const result = await db.query(queryString, [project_id, user]);
	return result[0] as SelectedProject;
};
