import { Request, Response, NextFunction } from 'express';
import {
	getProjectsByUserId,
	createProject,
	getAllUsers,
	deleteProject,
	selectProject,
	findProjectByCode,
	joinProject,
	leaveProject,
	updateRole,
	addCode,
} from '../models/projects';

export const createNewProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { project_name } = req.body;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const existingDBs = await getProjectsByUserId(userId);
		if (existingDBs) {
			const duplicate = existingDBs.find(
				projectName => projectName.project_name === project_name
			);

			if (duplicate) {
				console.log('Project already exists');
				return res.sendStatus(400);
			}
		}

		const newProject = await createProject(project_name, userId);
		res.locals.project = newProject; 
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in projectController createNewProject: ${error}`,
		});
	}
};

export const getAllProjectsByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.user?.id;
	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const projects = await getProjectsByUserId(userId);
		res.locals.projects = projects; 
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in projectController getAllProjectsByUserId: ${error}`,
		});
	}
};

export const selectProjectAndGetAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { projectId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}
	try {
		const allUsers = await getAllUsers(Number(projectId));
		res.locals.users = allUsers; 
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in projectController selectProjectAndGetAllUsers: ${error}`,
		});
	}
};

export const deleteProjectById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { projectId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const project = await selectProject(Number(projectId));
		if (userId != project.owner) {
			console.log('Only the owner can delete a project');
			return res.sendStatus(401);
		}
		const deleted = await deleteProject(Number(projectId), Number(userId));
		res.locals.deletedProject = deleted;
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in projectController deleteProjectById: ${error}`,
		});
	}
};

export const joinExistingProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { code } = req.body;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const existingProject = await findProjectByCode(code);
		if (!existingProject) {
			console.log('Project with matching code does not exist');
			return res.sendStatus(400);
		}
		await joinProject(
			userId,
			existingProject.project_name,
			existingProject.project_id
		);
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in projectController joinExistingProject: ${error}`,
		});
	}
};

export const leaveCurrentProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { projectId } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const project = await selectProject(Number(projectId));
		if (!project) {
			console.log('Project does not exist');
			return res.sendStatus(400);
		}
		await leaveProject(userId, Number(projectId));
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in projectController leaveCurrentProject: ${error}`,
		});
	}
};

export const kickUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { projectId, user } = req.params;
	const userId = req.user?.id;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	try {
		const project = await selectProject(Number(projectId));
		if (!project) {
			console.log('Project does not exist');
			return res.sendStatus(400);
		}
		await leaveProject(Number(user), Number(projectId));
		return next();
	} catch (error) {
		next({
			status: 400,
			message: `Error in projectController leaveCurrentProject: ${error}`,
		});
	}
};

export const updateUserRole = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { projectId } = req.params;
	const userId = req.user?.id;
	const { user, role } = req.body;

	try {
		await updateRole(Number(projectId), role, Number(user));
		return next();
	} catch (error) {
		return next({
			status: 400,
			message: `Error in projectController storeAccessCode: ${error}`,
		});
	}
};

export const storeAccessCode = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { code, project_id, role } = req.body;
	const userId = req.user?.id;
	const project = await selectProject(project_id);
	const ownerId = project.owner;

	if (!userId) {
		console.log('Unauthorized');
		return res.sendStatus(401);
	}

	if (userId === ownerId) {
		try {
			const newCode = await addCode(code, project_id, userId);
			res.locals.newCode = newCode;
			return next();
		} catch (error) {
			return next({
				status: 400,
				message: `Error in projectController storeAccessCode: ${error}`,
			});
		}
	}
};
