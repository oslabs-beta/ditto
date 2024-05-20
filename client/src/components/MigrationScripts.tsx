import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
interface Migration {
	version: string;
	description: string;
	date_migrated: string;
	state: string;
	execution_time: string;
}

const MigrationScripts: React.FC = () => {
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);
	const username = useSelector((state: any) => state.user); // user
	console.log('current user:', username);
	console.log('current database:', selectedDatabase);
	const [migrations, setMigrations] = useState<Migration[]>([]);

	useEffect(() => {
		const fetchMigrations = async () => {
			try {
				const response = await fetch('/databases', {
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
					<th>Execution Time</th>
				</tr>
			</thead>
			<tbody>
				{migrations.map((migration, index) => (
					<tr key={index}>
						<td>{migration.version}</td>
						<td>{migration.description}</td>
						<td>{migration.date_migrated}</td>
						<td>{migration.state}</td>
						<td>{migration.execution_time}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default MigrationScripts;
