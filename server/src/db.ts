import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
	user: process.env.RDS_USERNAME_JAY,
	host: process.env.RDS_HOST,
	database: process.env.NODE_ENV === 'test' ? 'test' : 'postgres',
	password: process.env.RDS_PASSWORD_JAY,
	port: 5432,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = {
	async connect(): Promise<void> {
		// Connect to the database
		try {
			await pool.connect();
			console.log('Connected to PostgreSQL database');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error('Connection error:', err.stack);
			} else {
				console.error('An unknown error occurred:', err);
			}
		}
	},

	async end(): Promise<void> {
		// End connection to database
		try {
			await pool.end();
			console.log('Connection to database ended');
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error('Connection error:', err.stack);
			} else {
				console.error('An unknown error occurred:', err);
			}
		}
	},

	async query(queryString: string): Promise<any> {
		try {
			const result = await pool.query(queryString);
			return result.rows; // should return rows for SELECT
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error('Query error:', err.stack);
			} else {
				console.error('An unknown error occurred:', err);
			}
		}
	},
};

export default db;
