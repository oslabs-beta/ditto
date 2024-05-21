import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setdbId } from '../store';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';

interface Migration {
	version: string;
	description: string;
	executed_at: string;
	status: string;
	// execution_time: string; (query is giving me an object)
}

const MigrationScripts: React.FC = () => {
	const navigate = useNavigate();
	const dbId = useSelector((state: any) => state.dbId);
	console.log('dbId: ', dbId);
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);
	const username = useSelector((state: any) => state.user); // user

	const [migrations, setMigrations] = useState<Migration[]>([]);
	useEffect(() => {
		const fetchMigrations = async () => {
			const token = localStorage.getItem('token');
			try {
				const response = await fetch(`/migrationlog/${dbId}`, {
					// we'll need getDBConnectionByUserID so endpoint db/getConnectionString/:dbId
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`, // Replace with your JWT token logic
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				console.log('result: ', result);
				setMigrations(result);
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedDatabase) {
			fetchMigrations();
		}
	}, [selectedDatabase, username]);

	/* Add Migrations Button */
	const handleFormSubmit = (data: {
		version: string;
		description: string;
		script: string;
	}) => {
		console.log('Form Data:', data);
	};
	/* Add Migrations Button */
	const handleSubmit = () => {
		console.log('went into handleSubmit');
		navigate('/addMigrations');
	};
	/* Add Migrations Button */

	/* Code Editor */
	const [code, setCode] = useState('-- Write your PostgreSQL script here');

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleRunScript = () => {
		const response = fetch('./', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer {token}`,
			},
			body: JSON.stringify({}),
		});
	};
	/* Code Editor */

	return (
		<div className="MigrationScriptsContainer">
			<div className="addMigrationsButton" onClick={handleSubmit}>
				{/* Add Migrations Button */}
				<button type="button">Add Migration</button>
			</div>
			{/* Add Migrations Button */}
			<table>
				<thead>
					<tr>
						<th>Version</th>
						<th>Description</th>
						<th>Status</th>
						<th>Date Migrated</th>
					</tr>
				</thead>
				<tbody>
					{migrations.map((migration, index) => (
						<tr key={index}>
							<td>{migration.version}</td>
							<td>{migration.description}</td>
							<td>{migration.status}</td>
							<td>{migration.executed_at}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="codeEditorContainer">
				<div className="codeEditor">
					<CodeEditor initialCode={code} onCodeChange={handleCodeChange} />
					<button onClick={handleRunScript}>Run Script</button>
				</div>
			</div>
		</div>
	);
};

export default MigrationScripts;
