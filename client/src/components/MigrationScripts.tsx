import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface Migration {
	version: string;
	description: string;
	date_migrated: string;
	state: string;
	// execution_time: string; (query is giving me an object)
}

const MigrationScripts: React.FC = () => {
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);
	const username = useSelector((state: any) => state.user); // user
	console.log('current user:', username);
	console.log('current database:', selectedDatabase);
	const [migrations, setMigrations] = useState<Migration[]>([]);

	// this is going to need muiltiple fields depending on body *** Add Scripts ***
	// const handleSubmit = async (
	// 	e: React.FormEvent<HTMLFormElement>
	// ): Promise<void> => {
	// 	try {
	// 		e.preventDefault();

	// 		const response = await fetch('http://localhost:3001/migration', { // endpoint that leads to addMigration
	// 			// /auth/login
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify(/* whatever data we need to send*/ ),
	// 		});

	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			// we want to fetch for the migration scripts again and dispatch migrations again here
	// 			navigate('/migration');
	// 		} else {
	// 			console.error('Login failed:', await response.json());
	// 		}
	// 	} catch (error) {
	// 		console.error('An error occurred during login:', error);
	// 	}
	// };

	useEffect(() => {
		const fetchMigrations = async () => {
			try {
				const response = await fetch('/databases', {
					// we'll need getDBConnectionByUserID so endpoint db/getConnectionString/:dbId
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						// Authorization: `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token logic
					},
					body: JSON.stringify({
						dbName: selectedDatabase,
						username: username,
					}),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				console.log('result: ', result);
				setMigrations(result.migrations);
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedDatabase) {
			fetchMigrations();
		}
	}, [selectedDatabase, username]);

	return (
		<table>
			<thead>
				<tr>
					<th>Version</th>
					<th>Description</th>
					<th>Date Migrated</th>
					<th>State</th>
					{/* <th>Execution Time</th> */}
				</tr>
			</thead>
			<tbody>
				{migrations.map((migration, index) => (
					<tr key={index}>
						<td>{migration.version}</td>
						<td>{migration.description}</td>
						<td>{migration.date_migrated}</td>
						<td>{migration.state}</td>
						{/* <td>{migration.execution_time}</td> the query is giving me
						an object */}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default MigrationScripts;
