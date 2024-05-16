import express, { Express, Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	console.log('hitting routers');
	res.sendStatus(201);
});

router.patch('/', (req, res) => {
	res.status(200);
});

export default router;
