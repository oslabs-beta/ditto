import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
	setSelectedMigration,
	setSelectedScript,
	setScript,
	setMigrationVersions,
} from '../store';

interface Migration {
	migration_id: string;
	version: string;
	description: string;
	executed_at: string;
	script: string;
	status: string;
}

const MigrationScripts: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dbId = useSelector((state: any) => state.dbId);
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);

	const username = useSelector((state: any) => state.user); // user

	const selectedMigration = useSelector(
		(state: { selectedMigration: string }) => state.selectedMigration
	);
	const migrationsArray = useSelector(
		(state: { migrationVersions: Migration[] }) => state.migrationVersions
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
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
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
				dispatch(setMigrationVersions(sortedMigrations));
			} catch (error) {
				console.error('Error fetching migrations:', error);
			}
		};

		if (selectedDatabase) {
			fetchMigrations();
		} else {
			dispatch(setMigrationVersions([]));
		}
	}, [selectedDatabase, selectedMigration]);

	const handleSubmit = () => {
		dispatch(setScript(''));
		navigate('/addMigrations');
	};

	const handleUpdateSubmit = () => {
		if (selectedMigration !== '') {
			navigate('/updateMigrations');
		}
	};

	const handleDeleteSubmit = async () => {
		try {
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
			dispatch(setMigrationVersions(migrationsArr));
			// are we expecting response? we would have to json pars and confirm deletion or error
			// dispatch migrationlog logic
		} catch (error) {
			console.error('Error fetching migrations:', error);
		}
	};

	const handleRunScript = async (e: React.FormEvent) => {
		e.preventDefault;

		try {
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
			if (Array.isArray(result)) {
				console.log(result);
				dispatch(setMigrationVersions(result));
			} else {
				console.error('Expected array but got:', result);
				dispatch(setMigrationVersions([]));
			}
		} catch (error) {
			console.error('Error running migrations:', error);
			navigate('/migration');
		}
	};

	const handleHighlight = (id: string, script: string) => {
		dispatch(setSelectedMigration(id === selectedMigration ? '' : id));
		dispatch(setSelectedScript(script));
	};

	return (
		<div className="MigrationScriptsContainer">
			<div className="scriptsheader">
				<fieldset>
					<label>
						<input value={selectedDatabase} readOnly={true} />
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

					{migrationsArray.map(migration => (
						<tbody key={migration.migration_id}>
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
									<div className="executeAndButtons">
									{migration.executed_at}
									<div>
									<button
					className="purplebtn"
					type="button"
					onClick={handleUpdateSubmit}
				>
					<FontAwesomeIcon icon={faEdit} />
				</button>
									<button className="whitebtn" type="button" onClick={handleDeleteSubmit}>
					<FontAwesomeIcon icon={faTrashCan} />
				</button></div></div>
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

			</div>
		</div>
	);
};

export default MigrationScripts;
