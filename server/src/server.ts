import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import migrationRoutes from './routes/migrationRoutes';
import auditRoutes from './routes/auditRoutes';
import db from './db';

const app: Express = express();
const port: number = 3000;

db.connect();
app.use(express.json());

app.use('/migration', migrationRoutes);

app.use('/audit', auditRoutes);

// catch all route handler
app.use('*', (req: Request, res: Response) => {
	console.log('404 error handler triggered.');
	res.status(404).json('Page not found.');
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(`Error Handling Middleware: ${errorObj.log}`);
	console.error(`Error details: ${err.message}`);
});

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Express server listening on port ${port}`);
	});
}

export default app;
