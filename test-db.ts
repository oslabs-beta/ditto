import db from './server/src/db';

const testQuery = async () => {
	try {
		const queryString = 'SELECT 1';
		const result = await db.query(queryString);
		console.log('Test query result:', result);
	} catch (err) {
		console.error('Test query error:', err);
	}
};

testQuery();
