import express, { Express, Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	res.status(201);
});

export default router;
