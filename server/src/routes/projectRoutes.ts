import express, { Request, Response, NextFunction } from 'express';
import { validateJWT } from '../controllers/authController';
import {
	createNewProject,
	deleteProjectById,
	getAllProjectsByUserId,
	joinExistingProject,
	kickUser,
	leaveCurrentProject,
	selectProjectAndGetAllUsers,
	updateUserRole,
	storeAccessCode,
} from '../controllers/projectController';

const router = express.Router();

router.post(
	'/create',
	validateJWT,
	createNewProject,
	getAllProjectsByUserId,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(201).json(res.locals.projects);
	}
);

router.get(
	'/allprojects',
	validateJWT,
	getAllProjectsByUserId,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.projects);
	}
);

router.get(
	'/allusers/:projectId',
	validateJWT,
	selectProjectAndGetAllUsers,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.users);
	}
);

router.delete(
	`/delete/:projectId`,
	validateJWT,
	deleteProjectById,
	getAllProjectsByUserId,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.projects);
	}
);

router.post(
	'/join',
	validateJWT,
	joinExistingProject,
	getAllProjectsByUserId,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.projects);
	}
);

router.delete(
	`/leave/:projectId`,
	validateJWT,
	leaveCurrentProject,
	getAllProjectsByUserId,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.projects);
	}
);

router.delete(
	`/kick/:projectId/:user`,
	validateJWT,
	kickUser,
	selectProjectAndGetAllUsers,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.users);
	}
);

router.patch(
	`/updaterole/:projectId`,
	validateJWT,
	updateUserRole,
	selectProjectAndGetAllUsers,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.users);
	}
);
router.post(
	`/generate`,
	validateJWT,
	storeAccessCode,
	(_req: Request, res: Response, _next: NextFunction) => {
		res.status(200).json(res.locals.code);
	}
);

export default router;
