const { Pool } = require('pg');

const pool = new Pool ({
  connectionString: process.env.TEMP_URL,
});


export const migrationController = {
  async executeMigration(script: string, poolInstance: typeof pool = pool): Promise<void> {
    let client;
    try {
      client = await poolInstance.connect();
      await client.query(script);
    } catch (error: any) {
      console.error('Error executing migration', error.message);
      throw new Error(`Error executing migration: ${error.message}`);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
};
