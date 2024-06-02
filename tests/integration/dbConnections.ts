import request from 'supertest';
import app from '../../server/src/server';
import db from '../../server/src/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser } from '../../server/src/models/user';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
let token: string;
let dbId: string | number;

beforeAll(async () => {
	// initialize test database
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM databases');
	const user = await createUser('testuser', '123');
	token = jwt.sign(
		{ id: user.user_id, username: user.username },
		jwtSecret as jwt.Secret
	);
});

afterAll(async () => {
	await db.end();
});

describe('POST /db/addConnectionString', () => {
	it('should return 201 and add a db connection string', async () => {
		const response = await request(app)
			.post('/db/addConnectionString')
			.set('Authorization', `Bearer ${token}`)
			.send({
				db_name: 'testdb',
				connection_string: 'teststring',
			});
		dbId = response.body.db_id;
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).post('/db/addConnectionString').send({
			db_name: 'testdb',
			connection_string: 'teststring',
		});
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.post('/db/addConnectionString')
			.set('Authorization', `Bearer invalidtoken`)
			.send({
				db_name: 'testdb',
				connection_string: 'teststring',
			});

		expect(response.status).toBe(403);
	});

	it('should return 400 if connection string already exists', async () => {
		const response = await request(app)
			.post('/db/addConnectionString')
			.set('Authorization', `Bearer ${token}`)
			.send({
				db_name: 'testdb',
				connection_string: 'teststring',
			});

		expect(response.status).toBe(400);
	});
});

describe('GET /db/connectionStrings', () => {
	it('should return 200 and get all connection strings', async () => {
		const response = await request(app)
			.get(`/db/connectionStrings`)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).get(`/db/connectionStrings`);
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.get(`/db/connectionStrings`)
			.set('Authorization', `Bearer invalidtoken`);
		expect(response.status).toBe(403);
	});
});

describe('DELETE /db/deleteConnectionString/:dbId', () => {
	it('should return 200 and delete connection string', async () => {
		const response = await request(app)
			.delete(`/db/deleteConnectionString/${dbId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).delete(
			`/db/deleteConnectionString/${dbId}`
		);
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.delete(`/db/deleteConnectionString/${dbId}`)
			.set('Authorization', `Bearer invalidtoken`);
		expect(response.status).toBe(403);
	});
});
