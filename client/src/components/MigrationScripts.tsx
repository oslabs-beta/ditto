import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { setdbId, setSelectedMigration } from '../store';

interface Migration {
	migration_id: string;
	version: string;
	description: string;
	executed_at: string;
	script: string;
	status: string;
	// execution_time: string; (query is giving me an object)
}

const MigrationScripts: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dbId = useSelector((state: any) => state.dbId);
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);
	const username = useSelector((state: any) => state.user); // user
	const [migrations, setMigrations] = useState<Migration[]>([]);
	const selectedMigration = useSelector(
		(state: { selectedMigration: string }) => state.selectedMigration
	);

	useEffect(() => {
		const fetchMigrations = async () => {
			const token = sessionStorage.getItem('token');
			try {
				const response = await fetch(`/migrationlog/all/${dbId}`, {
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

				let result = await response.json();
				result.sort(
					(a: { version: number }, b: { version: number }) =>
						a.version - b.version
				);
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

	/* Handles Update Button */
	const handleUpdateSubmit = () => {
		// we are setting state on click of the table row
		// and only redirecting if selectedMigration state has been set
		if (selectedMigration !== '') {
			navigate('/updateMigrations');
		}
	};

	/* Handles Delete Button */
	const handleDeleteSubmit = async () => {
		try {
			// might want to add an are you sure prompt

			// We need to dispatch state here so we know which version we're working on

			const token = sessionStorage.getItem('token');
			const response = await fetch(`/migrationlog/${selectedMigration}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			let migrationsArr = await response.json();
			migrationsArr.sort(
				(a: { version: number }, b: { version: number }) =>
					a.version - b.version
			);
			setMigrations(migrationsArr);
			// are we expecting response? we would have to json pars and confirm deletion or error
			// dispatch migrationlog logic
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}
	};

	/* Code Editor */
	const [code, setCode] = useState('');

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

	const handleHighlight = (id: string, script: string) => {
		dispatch(setSelectedMigration(id === selectedMigration ? '' : id));
		setCode(script);
	};

	return (
		<div className="MigrationScriptsContainer">
			<div className="addMigrationsButton">
				{/* Add Migrations Button */}
				<button type="button" onClick={handleSubmit}>
					Add Migration
				</button>
				<button type="button" onClick={handleUpdateSubmit}>
					Update
				</button>
				<button type="button" onClick={handleDeleteSubmit}>
					Delete
				</button>
			</div>
			{/* Add Migrations Button */}
			<table style={{ borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th>Version</th>
						<th>Description</th>
						<th>Status</th>
						<th>Date Migrated</th>
					</tr>
				</thead>
				{migrations.map(migration => (
					<tbody key={migration.migration_id}>
						<tr
							id={migration.migration_id}
							className="migrationversions"
							onClick={() =>
								handleHighlight(migration.migration_id, migration.script)
							}
							style={{
								backgroundColor:
									selectedMigration === migration.migration_id
										? '#C58DD0'
										: 'transparent',
							}}
						>
							<td>{migration.version}</td>
							<td>{migration.description}</td>
							<td>{migration.status}</td>
							<td>{migration.executed_at}</td>
						</tr>
					</tbody>
				))}
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
