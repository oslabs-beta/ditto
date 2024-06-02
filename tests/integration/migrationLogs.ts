import request from 'supertest';
import app from '../../server/src/server';
import db from '../../server/src/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser } from '../../server/src/models/user';
import { addDBConnection } from '../../server/src/models/userDB';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
let token: string;
let dbId: number | string;
let migrationId: string | number;

beforeAll(async () => {
	// initialize test database
	await db.query('DELETE FROM migration_logs');
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM databases');
	const database = await addDBConnection('testconnection');
	const user = await createUser('testuser', '123');
	token = jwt.sign(
		{ id: user.user_id, username: user.username },
		jwtSecret as jwt.Secret
	);
	dbId = database.db_id;
});

afterAll(async () => {
	await db.end();
});

describe('POST /migrationlog/:dbId', () => {
	it('should return 201 and create a migration log', async () => {
		const response = await request(app)
			.post(`/migrationlog/${dbId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				version: 1,
				script: 'CREATE TABLE test (id INT);',
				description: 'Test migration',
			});
		migrationId = response.body.migration_id;
		console.log(migrationId);
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).post(`/migrationlog/${dbId}`).send({
			version: 1,
			script: 'CREATE TABLE test (id INT);',
			description: 'Test migration',
		});
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.post(`/migrationlog/${dbId}`)
			.set('Authorization', `Bearer invalidtoken`)
			.send({
				version: 1,
				script: 'CREATE TABLE test (id INT);',
				description: 'Test migration',
			});

		expect(response.status).toBe(403);
	});
});

describe('PATCH /migrationlog/:migrationId', () => {
	it('should return 200 and update migration log', async () => {
		const response = await request(app)
			.patch(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				version: 2,
				script: 'CREATE TABLE test (id INT);',
				description: 'updated test migration',
			});
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app)
			.patch(`/migrationlog/${migrationId}`)
			.send({
				version: 2,
				script: 'CREATE TABLE test (id INT);',
				description: 'updated test migration',
			});
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.patch(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer invalidtoken`)
			.send({
				version: 2,
				script: 'CREATE TABLE test (id INT);',
				description: 'updated test migration',
			});

		expect(response.status).toBe(403);
	});
});

describe('GET /migrationlog/:migrationId', () => {
	it('should return 200 and get migration log', async () => {
		const response = await request(app)
			.get(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).get(`/migrationlog/${migrationId}`);
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.get(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer invalidtoken`);
		expect(response.status).toBe(403);
	});
});

describe('GET /migrationlog/all/:dbId', () => {
	it('should return 200 and get all migration log', async () => {
		const response = await request(app)
			.get(`/migrationlog/all/${dbId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).get(`/migrationlog/all/${dbId}`);
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.get(`/migrationlog/all/${dbId}`)
			.set('Authorization', `Bearer invalidtoken`);
		expect(response.status).toBe(403);
	});
});

describe('DELETE /migrationlog/:migrationId', () => {
	it('should return 200 and delete migration log', async () => {
		const response = await request(app)
			.delete(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request(app).delete(`/migrationlog/${migrationId}`);
		expect(response.status).toBe(401);
	});

	it('should return 403 if token is invalid', async () => {
		const response = await request(app)
			.delete(`/migrationlog/${migrationId}`)
			.set('Authorization', `Bearer invalidtoken`);
		expect(response.status).toBe(403);
	});
});
