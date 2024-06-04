import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
	setdbId,
	setSelectedMigration,
	setMigrationVersions,
	setSelectedScript,
	setScript,
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
	const migrationVersions = useSelector(
		(state: any) => state.migrationVersions
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
				const sortedMigrations = result.sort(
					(a: Migration, b: Migration) =>
						parseInt(a.version) - parseInt(b.version)
				);
				console.log('sortedMigrations: ', sortedMigrations);
				setMigrations(sortedMigrations);
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedDatabase) {
			fetchMigrations();
		} else {
			setMigrations([]);
		}
	}, [selectedDatabase, selectedMigration, migrationVersions]);

	/* Add Migrations Button */
	const handleSubmit = () => {
		dispatch(setScript(''));
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
			dispatch(setSelectedMigration(''));
			setMigrations(migrationsArr);
			// are we expecting response? we would have to json pars and confirm deletion or error
			// dispatch migrationlog logic
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}
	};

	const handleRunScript = async (e: React.FormEvent) => {
		e.preventDefault;

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
				console.log(result);
				setMigrations(result);
			} else {
				console.error('Expected array but got:', result);
				setMigrations([]);
			}
			console.log(result);
		} catch (error) {
			console.error('Error running migrations:', error);
			navigate('/migration');
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
				<fieldset>
					<label>
						<input value={selectedDatabase} />
					</label>
					<legend>Database</legend>
				</fieldset>
				<button className="purplebtn" type="button" onClick={handleSubmit}>
					Add Migration
				</button>
			</div>
			<div className="migrationsTable">
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
						<tbody
							key={migration.migration_id}
							style={{
								backgroundColor:
									selectedMigration === migration.migration_id
										? '#b592f1'
										: 'transparent',
							}}
						>
							<tr
								id={migration.migration_id}
								className="migrationversions"
								onClick={() =>
									handleHighlight(migration.migration_id, migration.script)
								}
							>
								<td
									style={{
										backgroundColor:
											selectedMigration === migration.migration_id
												? '#b592f1'
												: 'transparent',
									}}
									className="version"
								>
									{migration.version}
								</td>
								<td
									style={{
										backgroundColor:
											selectedMigration === migration.migration_id
												? '#b592f1'
												: 'transparent',
									}}
									className="desc"
								>
									{migration.description}
								</td>
								<td
									style={{
										backgroundColor:
											selectedMigration === migration.migration_id
												? '#b592f1'
												: 'transparent',
									}}
									className="status"
								>
									{migration.status}
								</td>

								<td
									className="executedat"
									style={{
										backgroundColor:
											selectedMigration === migration.migration_id
												? '#b592f1'
												: 'transparent',
									}}
								>
									{migration.executed_at}
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className="codeEditorContainer">
				<div className="codeEditor">
					<fieldset>
						<label>
							<CodeEditor code={selectedScript} inMigration={true} />
						</label>
						<legend>Script</legend>
					</fieldset>
				</div>
			</div>
			<div className="scriptBtns">
				<button
					className="purplebtn"
					type="button"
					onClick={handleUpdateSubmit}
				>
					<FontAwesomeIcon icon={faEdit} />
				</button>
				<button className="whitebtn" type="button" onClick={handleDeleteSubmit}>
					<FontAwesomeIcon icon={faTrashCan} />
				</button>
			</div>
		</div>
	);
};

export default MigrationScripts;
