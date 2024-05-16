import { Pool } from 'pg';
import { describe, expect, test, beforeEach, afterEach } from '@jest/globals';
import { migrationController } from '../../server/src/engineController';


jest.mock('pg', () => {
    const mClient = {
        query: jest.fn(),
        release: jest.fn(),
    }

    const mPool = {
        connect: jest.fn().mockResolvedValue(mClient),
    }

    return { Pool: jest.fn(() => mPool) }
})

//beforeEach use new instance of a pool 
describe('Mock Engine', () => {
  let mpool: InstanceType<typeof Pool>;
  const connectionString = process.env.FAKE_URL;

  beforeEach(() => {
    mpool = new Pool({ connectionString });
  });

  afterEach(() => {
    jest.clearAllMocks;
  });

  it('should execute SQL migration script', async () => {
    const script = 'CREATE TABLE mock_table (id SERIAL PRIMARY KEY)';

    await migrationController.executeMigration(script, mpool);

    expect(mpool.connect).toHaveBeenCalled();
    const client =  await mpool.connect();
    expect(client.query).toHaveBeenCalledWith(script);
    expect(client.release).toHaveBeenCalled();
  });
});


//afterEach use jest.clearAllMocks() 

// check to see if the function to execute a migration works
    //expect function to have been called with the script 
        //script = CREATE TABLE mock_table (id SERIAL PRIMARY KEY);
        //should fail since didnt write function yet 