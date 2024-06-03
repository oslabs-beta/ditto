import express, { Express, Request, Response, NextFunction } from 'express';
import migrationRoutes from './routes/migrationRoutes';
import auditRoutes from './routes/auditRoutes';
import authRoutes from './routes/authRoutes';
import dbRoutes from './routes/dbRoutes';
import migrationLogRoutes from './routes/migrationLogRoutes';
import githubAuthRoutes from './routes/githubAuthRoutes';
import newDbRoutes from './routes/newDbRoutes';
import projectRoutes from './routes/projectRoutes';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port: number = 3001;

app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const joinPath = path.join(__dirname, '../../client/dist');
app.use(express.static(joinPath));

// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET as string,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );

app.use('/migration', migrationRoutes);

app.use('/audit', auditRoutes);

app.use('/migrationlog', migrationLogRoutes);

app.use('/auth', authRoutes);

// app.use('/db', newDbRoutes);
app.use('/db', dbRoutes);

app.use('/github', githubAuthRoutes);

app.use('/project', projectRoutes);

// catch all route handler
app.use('*', (req: Request, res: Response) => {
	console.log('404 error handler triggered.');
	res.sendFile(path.resolve(joinPath, 'index.html'));
	// res.status(404).json('Page not found.');
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
