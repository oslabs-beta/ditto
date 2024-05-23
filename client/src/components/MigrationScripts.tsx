import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import {
	setdbId,
	setSelectedMigration,
	setMigrationVersions,
	setSelectedScript,
} from '../store';

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
	const selectedScript = useSelector(
		(state: { selectedScript: string }) => state.selectedScript
	);
	useEffect(() => {
		const fetchMigrations = async () => {
			if (!selectedMigration) {
				dispatch(setSelectedScript(''));
			}
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

				const result = await response.json();
				// result.sort(
				// 	(a: { version: number }, b: { version: number }) =>
				// 		a.version - b.version
				// );
				const sortedMigrations = result.sort(
					(a: Migration, b: Migration) =>
						parseInt(a.version) - parseInt(b.version)
				);
				setMigrations(sortedMigrations);
				dispatch(setMigrationVersions(result));
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedDatabase) {
			fetchMigrations();
		} else {
			setMigrations([]);
			dispatch(setMigrationVersions([]));
		}
	}, [selectedDatabase, selectedMigration]);

	/* Add Migrations Button */
	// const handleFormSubmit = (data: {
	// 	version: string;
	// 	description: string;
	// 	script: string;
	// }) => {
	// 	console.log('Form Data:', data);
	// };
	/* Add Migrations Button */
	const handleSubmit = () => {
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
			dispatch(setSelectedScript(''));
			setMigrations(migrationsArr);
			// are we expecting response? we would have to json pars and confirm deletion or error
			// dispatch migrationlog logic
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}
	};

	// const handleCodeChange = (newCode: string) => {
	// 	setCode(newCode);
	// };


	const handleRunScript = async (e: React.FormEvent) => {
		e.preventDefault

		try {
			console.log('Entered handleRunScript');
			const token = sessionStorage.getItem('token');
			const response = await fetch('/migration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ dbId: Number(dbId) }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('result:', result);
			if (Array.isArray(result)) {
				setMigrations(result);
			} else {
				console.error('Expected array but got:', result);
				setMigrations([]);
			}
		} catch (error) {
			console.error('Error running migrations:', error);
		}
	};
	/* Code Editor */

	const handleHighlight = (id: string, script: string) => {
		dispatch(setSelectedMigration(id === selectedMigration ? '' : id));
		dispatch(setSelectedScript(script));
	};

	return (
		<div className="MigrationScriptsContainer">
			<div className="scriptsheader">
				{/* Add Migrations Button */}
				<div className="selectedDB font-bold">
					{selectedDatabase}
					{/* <h1>{selectedDatabase}</h1> */}
				</div>
				<button className="purplebtn" type="button" onClick={handleSubmit}>
					Add Migration
				</button>
			</div>
			<div className="migrationstable">
				<table>
					<thead>
						<tr>
							<th className="version">Version</th>
							<th className="desc">Description</th>
							<th className="status">Status</th>
							<th className="executedat">Date Migrated (ET)</th>
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
											? '#dc92ff'
											: 'transparent',
								}}
							>
								<td className="version">{migration.version}</td>
								<td className="desc">{migration.description}</td>
								<td className="status">{migration.status}</td>
								<td className="executedat">{migration.executed_at}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className="updatedeletebtn">
				<button
					className="purplebtn"
					type="button"
					onClick={handleUpdateSubmit}
				>
					Update
				</button>
				<button className="whitebtn" type="button" onClick={handleDeleteSubmit}>
					Delete
				</button>
			</div>
			<div className="codeEditorContainer">
				<div className="codeEditor">
					<CodeEditor initialCode={selectedScript} />
				</div>
			</div>
		</div>
	);
};

export default MigrationScripts;
