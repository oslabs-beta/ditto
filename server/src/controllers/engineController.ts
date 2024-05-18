
import { Pool } from 'pg';

export const createPool = (connectionString: string) => {
  return new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}


export const  executeMigration = async (script: string, pool: Pool): Promise<void> => {
    let client;
    try {
      client = await pool.connect();
      await client.query(script);
    } catch (error: any) {
      console.error('Error executing migration', error.message);
      throw new Error(`Error executing migration: ${error.message}`);
    } finally {
      if (client) {
        client.release();
      }
    }
  };
