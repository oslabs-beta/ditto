import express, { Express, Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	res.sendStatus(201);
});

router.patch('/:logId', (req: Request, res: Response) => {
	res.sendStatus(200);
});

export default router;
