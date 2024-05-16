// import statements up here
import request from 'supertest';
import db from '../../server/src/db';
import server from '../../server/src/server';

/*
TODO:
1. Test adding audit logs to DB
2. Test status within audit log changing from Pending to Success when script is executed successfully
3. Test adding migration logs to DB
*/

describe('Database testing', () => {
	// clear out the test DB before each test
	beforeEach(async () => {
		await db.query('TRUNCATE TABLE table_name RESTART IDENTITY CASCADE;');
	});

	describe('Adding migration logs to database', () => {
		it('should add migration logs to the database', async () => {
			const migrationLog = {
				description: 'new column',
				date: new Date(),
				state: 'Pending',
				executionTime: '40ms',
			};

			const response = await request(server)
				.post('/migration')
				.send(migrationLog);
			expect(response.status).toEqual(201);
			expect(response.body).toBe(migrationLog);
		});
	});

	describe('Adding audit logs to database', () => {
		it('should add audit logs to the database', async () => {
			const auditLog = {};
			const response = await request(server).post('/audit').send(auditLog);
			expect(response.status).toEqual(201);
			expect(response.body).toBe(auditLog);
		});
	});

	describe('Status within migration log should change from Pending to Success', () => {
		beforeEach(async () => {
			const migrationLog = {
				logId: 1,
				status: 'Pending',
			};
			await request(server).post('/migration').send(migrationLog);
		});
		it('should update status from Pending to Success upon successful script execution', async () => {
			const logId = 1;
			const status = 'Success';
			const response = await request(server)
				.patch(`/migration/${logId}`)
				.send({ status });
			expect(response.status).toEqual(200);
			expect(response.body.status).toEqual(status);
		});
	});
});
