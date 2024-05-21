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
			const token = sessionStorage.getItem('token');
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
	const handleSubmit = () => {
		console.log('went into handleSubmit');
		navigate('/addMigrations');
	};
	/* Add Migrations Button */

	/* Handles Update Button */
	const handleUpdateSubmit = () => {
		console.log('went into handleSubmit');
		navigate('/updateMigrations');
	};
	/* Handles Update Button */

	/* Handles Delete Button */
	const handleDeleteSubmit = () => {
		console.log('into handleDeleteSubmit');
		// might want to add an are you sure prompt

		const token = sessionStorage.getItem('token');
		const response = fetch(`./migrationlog?=${dbId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				AUTHORIZATION: `Bearer ${token}`,
			},
		});
		// are we expecting response? we would have to json pars and confirm deletion or error
		// dispatch migrationlog logic
	};
	/* Handles Delete Button */

	/* Code Editor */
	const [code, setCode] = useState('-- Write your PostgreSQL script here');

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleRunScript = () => {
		const token = sessionStorage.getItem('token');
		const response = fetch('./', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({}),
		});
	};
	/* Code Editor */

	return (
		<div className="MigrationScriptsContainer">
			<div className="addMigrationsButton">
				{/* Add Migrations Button */}
				<button type="button" onClick={handleSubmit}>
					Add Migration
				</button>
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
						<div className="migrationversions">
							<tr key={index}>
								<td>{migration.version}</td>
								<td>{migration.description}</td>
								<td>{migration.status}</td>
								<td>{migration.executed_at}</td>
							</tr>
							<button type="button" onClick={handleUpdateSubmit}>
								Update
							</button>
							<button type="button" onClick={handleDeleteSubmit}>
								Delete
							</button>
						</div>
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
