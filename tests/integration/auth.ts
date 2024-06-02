import request from 'supertest';
import app from '../../server/src/server';
import db from '../../server/src/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
let userId: string | number;

beforeAll(async () => {
	// initialize test database
	await db.query('DELETE FROM users');
});

afterAll(async () => {
	await db.end();
});

describe('registering new users', () => {
	it('should return 201 and create a new user', async () => {
		const response = await request(app).post('/auth/register').send({
			username: 'testuser1',
			password: '123',
		});
		userId = response.body;
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
	});

	it('should return 400 if no username or password is provided', async () => {
		const noPass = await request(app).post('/auth/register').send({
			username: 'testuser2',
			password: '',
		});

		const noUsername = await request(app).post('/auth/register').send({
			username: '',
			password: '123',
		});

		expect(noPass.status).toBe(400);
		expect(noUsername.status).toBe(400);
	});

	it('should return 400 if username already exists', async () => {
		const response = await request(app).post('/auth/register').send({
			username: 'testuser1',
			password: '123',
		});

		expect(response.status).toBe(400);
	});
});

describe('logging in users', () => {
	it('should return 200 and login user and generate token', async () => {
		const username = 'testuser1';
		const password = '123';
		const response = await request(app).post('/auth/login').send({
			username: username,
			password: password,
		});

		const token = jwt.sign(
			{ id: userId, username: username },
			jwtSecret as jwt.Secret,
			{ expiresIn: '1h' }
		);

		expect(response.status).toBe(200);
		expect(response.body).toBe(token);
	});

	it('should return 401 if no username or password is provided', async () => {
		const noPass = await request(app).post('/auth/login').send({
			username: 'testuser1',
			password: '',
		});

		const noUsername = await request(app).post('/auth/login').send({
			username: '',
			password: '123',
		});

		expect(noPass.status).toBe(401);
		expect(noUsername.status).toBe(401);
	});
});
