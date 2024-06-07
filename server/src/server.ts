import express, { Express, Request, Response, NextFunction } from 'express';
import migrationRoutes from './routes/migrationRoutes';
import authRoutes from './routes/authRoutes';
import migrationLogRoutes from './routes/migrationLogRoutes';
import githubAuthRoutes from './routes/githubAuthRoutes';
import newDbRoutes from './routes/newDbRoutes';
import projectRoutes from './routes/projectRoutes';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { removeCode } from './models/projects';
dotenv.config();

const app: Express = express();
const port: number = 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oneYear = 365 * 24 * 60 * 60 * 1000;

const joinPath = path.join(__dirname, '../../client/dist');
app.use(
	express.static(joinPath, {
		maxAge: oneYear,
	})
);

app.get('/robots.txt', (req: Request, res: Response) => {
	res.sendFile(path.join(joinPath, 'robots.txt'));
});

app.use('/migration', migrationRoutes);

app.use('/migrationlog', migrationLogRoutes);

app.use('/auth', authRoutes);

app.use('/db', newDbRoutes);

app.use('/github', githubAuthRoutes);

app.use('/project', projectRoutes);

app.use('*', (req: Request, res: Response) => {
	console.log('404 error handler triggered.');
	res.sendFile(path.resolve(joinPath, 'index.html'));
});

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
	setInterval(removeCode, 900000);
}

export default app;
