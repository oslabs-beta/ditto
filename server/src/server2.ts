// // import express, { Express, Request, Response, NextFunction } from 'express';
// // import migrationRoutes from './routes/migrationRoutes';
// // import auditRoutes from './routes/auditRoutes';
// // import authRoutes from './routes/authRoutes';
// // import dbRoutes from './routes/dbRoutes';
// // import migrationLogRoutes from './routes/migrationLogRoutes';
// // import scriptRoutes from './routes/scriptRoutes';
// // import githubAuthRoutes from './routes/githubAuthRoutes';
// // import cors from 'cors';
// // import session from 'express-session';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // const app: Express = express();
// // const port: number = 3001;

// // app.use(cors()); // Enable CORS for all routes

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true}));

// // app.use(session({
// // 	secret: process.env.SESSION_SECRET as string,
// // 	resave: false,
// // 	saveUninitialized: false,
// // }))

// // app.use('/migration', migrationRoutes);

// // app.use('/audit', auditRoutes);

// // app.use('/migrationlog', migrationLogRoutes);

// // app.use('/script', scriptRoutes);

// // app.use('/auth', authRoutes);

// // app.use('/db', dbRoutes);

// // app.use('/github', githubAuthRoutes);

// // // catch all route handler
// // app.use('*', (req: Request, res: Response) => {
// // 	console.log('404 error handler triggered.');
// // 	res.status(404).json('Page not found.');
// // });

// // // Global error handler
// // app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
// // 	const defaultErr = {
// // 		log: 'Express error handler caught unknown middleware error',
// // 		status: 500,
// // 		message: { err: 'An error occurred' },
// // 	};
// // 	const errorObj = Object.assign({}, defaultErr, err);
// // 	console.log(`Error Handling Middleware: ${errorObj.log}`);
// // 	console.error(`Error details: ${err.message}`);
// // });

// // if (require.main === module) {
// // 	app.listen(port, () => {
// // 		console.log(`Express server listening on port ${port}`);
// // 	});
// // }

// // export default app;
// import express, { Request, Response } from 'express';
// import { Pool } from 'pg';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import cors from 'cors'; // test
// import axios from 'axios';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// //test
// app.use(
// 	cors({
// 		origin: 'http://localhost:3000', // Replace with your frontend URL
// 	})
// );
// //test

// const pool = new Pool({
// 	user: process.env.DB_USER,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_NAME,
// 	password: process.env.DB_PASSWORD,
// 	port: Number(process.env.DB_PORT),
// });

// app.use(express.json());

// interface LoginRequest {
// 	username: string;
// 	password: string;
// }

// app.post('/login', async (req: Request, res: Response) => {
// 	const { username, password }: LoginRequest = req.body;
// 	console.log('here is a response');
// 	console.log('username and password: ', username, password);
// 	try {
// 		const result = await pool.query('SELECT * FROM users WHERE username = $1', [
// 			username,
// 		]);
// 		if (result.rows.length === 0) {
// 			return res.status(400).json({ error: 'Invalid username' });
// 		}

// 		const user = result.rows[0];
// 		const isPasswordValid = await bcrypt.compare(password, user.password);
// 		if (!isPasswordValid) {
// 			return res.status(400).json({ error: 'Invalid password' });
// 		}

// 		// const token = jwt.sign(
// 		// 	{ userId: user.id },
// 		// 	process.env.JWT_SECRET as string,
// 		// 	{ expiresIn: '1h' }
// 		// );

// 		const dbResult = await pool.query(
// 			'SELECT db_name FROM databases WHERE user_id = $1',
// 			[user.id]
// 		);
// 		const databases = dbResult.rows.map(
// 			(row: { db_name: string }) => row.db_name
// 		);

// 		res.json({ databases }); // add token if you gonna use jwt
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// });

// // app.get('/github/callback', async (req, res) => {
// // 	const code = req.query.code;
// // 	const clientId = process.env.GITHUB_CLIENT_ID;
// // 	const clientSecret = process.env.GITHUB_CLIENT_SECRET;

// // 	if (!code || !clientId || !clientSecret) {
// // 		return res.status(400).json({ error: 'Missing required parameters' });
// // 	}

// // 	try {
// // 		const response = await axios.post(
// // 			'https://github.com/login/oauth/access_token',
// // 			{
// // 				client_id: clientId,
// // 				client_secret: clientSecret,
// // 				code,
// // 			},
// // 			{
// // 				headers: { accept: 'application/json' },
// // 			}
// // 		);

// // 		const { access_token } 4= response.data;

// // 		if (access_token) {
// // 			res.json({ access_token });
// // 		} else {
// // 			res.status(400).json({ error: 'Failed to get access token' });
// // 		}
// // 	} catch (error) {
// // 		res.status(500).json({ error: 'Internal Server Error' });
// // 	}
// // });

// app.get('/auth/github', (req, res) => {
// 	const redirect_uri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}`;
// 	res.redirect(redirect_uri);
// });

// app.get('/github/callback', async (req, res) => {
// 	const { code } = req.query;
// 	const body = {
// 		client_id: process.env.GITHUB_CLIENT_ID,
// 		client_secret: process.env.GITHUB_CLIENT_SECRET,
// 		code,
// 	};

// 	try {
// 		const tokenResponse = await axios.post(
// 			'https://github.com/login/oauth/access_token',
// 			body,
// 			{
// 				headers: {
// 					accept: 'application/json',
// 				},
// 			}
// 		);

// 		const accessToken = tokenResponse.data.access_token;
// 		const userResponse = await axios.get('https://api.github.com/user', {
// 			headers: {
// 				Authorization: `Bearer ${accessToken}`,
// 			},
// 		});

// 		res.json(userResponse.data);
// 	} catch (error) {
// 		res.status(500).send('Authentication failed');
// 	}
// });

// app.post('/databases', async (req: Request, res: Response) => {
// 	const { dbName, username } = req.body;
// 	try {
// 		const result = await pool.query(
// 			'SELECT ml.* FROM migration_log ml JOIN databases d ON ml.migration_id = d.migration_id JOIN users u ON d.user_id = u.id WHERE d.db_name = $1 AND u.username = $2;',
// 			[dbName, username]
// 		);
// 		console.log('result: ', result.rows);
// 		res.json({ migrations: result.rows });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// });

// app.post('/signup', async (req: Request, res: Response) => {
// 	const { username, password } = req.body;
// 	try {
// 		const hashedPassword = await bcrypt.hash(password, 10);
// 		const result = await pool.query(
// 			'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
// 			[username, hashedPassword]
// 		);
// 		res.status(201).json({ message: 'User created', user: result.rows[0] });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// });

// app.get('/users', async (req: Request, res: Response) => {
// 	try {
// 		const result = await pool.query('SELECT username, password FROM users');
// 		res.json(result.rows);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Server error' });
// 	}
// });

// app.listen(port, () => {
// 	console.log(`Server is running on port ${port}`);
// });
