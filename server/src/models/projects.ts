import db from '../db';

export interface Project {
	date_created: string;
	project_name: string;
	project_id: number;
	owner: number;
	code: string;
}

export interface UserProject {
	user_project_id: number;
	project_name: string;
	user_id: number;
	project_id: number;
	role: string;
}

export interface SelectedProject {
	project_name: string;
	user_id: number;
	project_id: number;
	role: string;
}

export const getProjectsByUserId = async (
	userId: number
): Promise<UserProject[]> => {
	const queryString = `
  SELECT *
  FROM user_projects
  WHERE user_id = $1;
  `;
	const result = await db.query(queryString, [userId]);
	return result as UserProject[];
};

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

// use this in frontend - don't need to be in middleware
export const addCode = async (
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

export const findProjectByCode = async (code: string): Promise<Project> => {
	const queryString = `
  SELECT *
  FROM projects
  WHERE code = $1;
  `;

	const result = await db.query(queryString, [code]);
	return result[0] as Project;
};

export const joinProject = async (
	user: number,
	project_name: string,
	project_id: number
): Promise<void> => {
	const queryString = `
  INSERT INTO user_projects (project_name, user_id, project_id, role)
  VALUES ($1, $2, $3, $4);
  `;
	await db.query(queryString, [project_name, user, project_id, 'User']);
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
  SELECT u.username, u.user_id, up.role
  FROM user_projects AS up
  JOIN users AS u ON up.user_id = u.user_id
  WHERE up.project_id = $1;
  `;
	const result = await db.query(queryString, [project_id]);
	return result as string[];
};

export const selectProject = async (project_id: number): Promise<Project> => {
	const queryString = `
  SELECT *
  FROM projects
  WHERE project_id = $1;
  `;
	const result = await db.query(queryString, [project_id]);
	return result[0] as Project;
};
