import express, { Request, Response, NextFunction } from 'express';
import { executeMigration, createPool } from '../controllers/engineController';
import { validateJWT } from '../controllers/authController';
import { getDBConnectionByUserId } from '../models/userDB';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
	res.sendStatus(201);
});

router.post('/', validateJWT, async (req: Request, res: Response, next: NextFunction) => {
	const { script, dbId } = req.body;
	const userId = req.user?.id; //depends on how we request the string like req.user or req.authuser???

	if (!script || !dbId || !userId ) {
		return res
			.status(400)
			.json({ error: 'script, database ID, user ID required. ' });
	}

	try {
	  const connectionStrings = await getDBConnectionByUserId(userId);
      const connectionString = connectionStrings.find(db => db.db_id === dbId)?.connection_string;

      if (!connectionString) {
        return res.status(404).json({ error: 'Connection string not found.' });
      }

      const pool = createPool(connectionString);
      await executeMigration(script, pool);

	  res.status(201).json({ message: 'Migration executed successfully' });
	} catch (error) {
	  next(error);
	}
});

router.patch('/:logId', (req: Request, res: Response) => {
	res.sendStatus(200);
});

export default router;
