import express, { Request, Response, NextFunction } from 'express';
import { migrationController  } from '../engineController';
import { Pool } from 'pg'

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	res.sendStatus(201);  
  
  
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const { script } = req.body;
	const { connectionString } = req.body; //depends on how we request the string like req.user or req.authuser???

	if (!script || !connectionString) {
		return res.status(400).json({ error: 'script or connection string required. '})
	}
	
	try {
		const pool = new Pool ({ connectionString });
		await migrationController.executeMigration(script, pool);
		res.status(201).json({ message: 'Migration executed successfully.' });
	} catch(error: any) {
		next(error);
	}
});

router.patch('/:logId', (req: Request, res: Response) => {
	res.sendStatus(200);
});

export default router;
