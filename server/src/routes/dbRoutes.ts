// import express, { Request, Response, NextFunction } from 'express';
// import {
// 	addDBConnectionString,
// 	getConnectionString,
// 	deleteConnectionStringById,
// } from '../controllers/dbController';
// import { validateJWT } from '../controllers/authController';

// const router = express.Router();

// router.post(
// 	'/addConnectionString',
// 	validateJWT,
// 	addDBConnectionString,
// 	(_req: Request, res: Response, _next: NextFunction) => {
// 		res.status(201).json(res.locals.db);
// 	}
// );
// router.get(
// 	'/connectionStrings',
// 	validateJWT,
// 	getConnectionString,
// 	(_req: Request, res: Response, _next: NextFunction) => {
// 		res.status(200).json(res.locals.connectionStrings);
// 	}
// );

// router.delete(
// 	`/deleteConnectionString/:dbId`,
// 	validateJWT,
// 	deleteConnectionStringById,
// 	(_req: Request, res: Response, _next: NextFunction) => {
// 		res.status(200).json(res.locals.userDBs);
// 	}
// );

// export default router;
