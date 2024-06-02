// import { Pool } from 'pg';
// import { Request, Response, NextFunction } from 'express';
// import { executeMigration} from '../../server/src/controllers/engineController';
// import { getDBConnectionByUserId, getPendingMigrations, updateMigrationStatus, validateChecksum, } from '../../server/src/models/userDB';

// jest.mock('../../server/src/models/userDB');
// jest.mock('pg', () => {
//     const mClient = {
//         query: jest.fn(),
//         release: jest.fn(),
//     };

//     const mPool = {
//         connect: jest.fn().mockResolvedValue(mClient),
//     };

//     return { Pool: jest.fn(() => mPool) };
// });

// describe('Mock Engine', () => {
//     let pool: InstanceType<typeof Pool>;
//     const connectionString = process.env.FAKE_URL;

//     beforeEach(() => {
//         jest.clearAllMocks();
//         pool = new Pool({ connectionString });
//     });

//     const mockRequest = (body: any) => ({
//         body,
//         user: {id: 1},
//     }) as Request;

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should execute SQL migration script', async () => {
//         const script = 'CREATE TABLE mock_table (id SERIAL PRIMARY KEY)';

//         await migrationController.executeMigration(script, pool);

//         expect(pool.connect).toHaveBeenCalled();
//         const client = await pool.connect();
//         expect(client.query).toHaveBeenCalledWith(script);
//         expect(client.release).toHaveBeenCalled();
//     });

//     it('should not execute with INVALID SQL script', async () => {
//         const invalid = 'THIS IS AN INVALID SCRIPT';
//         const client = await pool.connect();
//         (client.query as jest.Mock).mockRejectedValueOnce(new Error('Syntax error in SQL statement')); // change

//         await expect(migrationController.executeMigration(invalid, pool))
//             .rejects
//             .toThrow('Error executing migration: Syntax error in SQL statement');

//         expect(pool.connect).toHaveBeenCalled();
//         expect(client.query).toHaveBeenCalledWith(invalid);
//         expect(client.release).toHaveBeenCalled();
//     });

//     it('should handle connection errors', async () => {
//         const script = 'CREATE TABLE mock_table (id SERIAL PRIMARY KEY)';
//         (pool.connect as jest.Mock).mockRejectedValueOnce(new Error('Connection error')); // change

//         await expect(migrationController.executeMigration(script, pool))
//             .rejects
//             .toThrow('Error executing migration: Connection error');

//         expect(pool.connect).toHaveBeenCalled();
//     });

//     it('should handle query errors', async () => {
//         const script = 'CREATE TABLE mock_table (id SERIAL PRIMARY KEY)';
//         const client = await pool.connect();
//         (client.query as jest.Mock).mockRejectedValueOnce(new Error('Query error')); // change

//         await expect(migrationController.executeMigration(script, pool))
//             .rejects
//             .toThrow('Error executing migration: Query error');

//         expect(pool.connect).toHaveBeenCalled();
//         expect(client.query).toHaveBeenCalledWith(script);
//         expect(client.release).toHaveBeenCalled();
//     });
// });
