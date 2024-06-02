import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
	user: process.env.RDS_USERNAME,
	host: process.env.RDS_HOST,
	database: process.env.NODE_ENV === 'test' ? 'test' : 'dittoDB',
	password: process.env.RDS_PASSWORD,
	port: 5432,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = {
	async connect(): Promise<void> {
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

	async query(queryString: string, values?: (string | number)[]): Promise<any> {
		try {
			const result = await pool.query(queryString, values);
			return result.rows;
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
