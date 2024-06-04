// SidePanel.tsx
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrashCan,
	faDatabase,
	faScroll,
} from '@fortawesome/free-solid-svg-icons';

import {
	setSelectedTable,
	setSelectedDatabase,
	setSelectedMigration,
	setShowInput,
	setDbName,
	setConnectionString,
	setDatabases,
	setSelectedAction,
	setdbId,
	setSelectedScript,
	setMigrationVersions,
} from '../store';

const SidePanel: React.FC = () => {
	const dispatch = useDispatch();
	const selectedTable = useSelector((state: any) => state.selectedTable);
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);

	const showInput = useSelector((state: any) => state.showInput);

	const dbName = useSelector((state: any) => state.dbName);
	const connectionString = useSelector((state: any) => state.connectionString);
	const databases = useSelector((state: any) => state.databases) || [];
	const selectedDbId = useSelector((state: { dbId: string }) => state.dbId);
	const selectedAction = useSelector(
		(state: { selectedAction: string }) => state.selectedAction
	);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const selectedProjectId = useSelector(
		(state: { projectId: string }) => state.projectId
	);
	const userRole = useSelector((state: any) => state.userRole);
	const [isOpen, setIsOpen] = useState(false);
	const referenceElement = useRef<HTMLButtonElement>(null);
	const popperElement = useRef<HTMLDivElement>(null);
	const dbId = useSelector((state: any) => state.dbId);
	const selectedScript = useSelector(
		(state: { selectedScript: string }) => state.selectedScript
	);
	const projectId = useSelector(
		(state: { projectId: string }) => state.projectId
	);
	const token = sessionStorage.getItem('token');
	const actions = ['Migrate', 'Repair', 'Undo', 'Clean'];

	const handleButtonClick = async (btnText: string | null) => {
		if (btnText === 'adddb') {
			dispatch(setShowInput(showInput ? false : true));
		} else {
			if (selectedDatabase) {
				try {
					const response = await fetch(
						`/db/deleteConnectionString/${selectedDbId}/${projectId}`,
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`, // Replace with your JWT token logic
							},
						}
					);
					setIsOpen(false);
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const userDBs = await response.json();
					dispatch(setDatabases(userDBs));
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const handleExecute = async (action: string) => {
		switch (action) {
			case 'Migrate':
				try {
					const token = sessionStorage.getItem('token');
					const response = await fetch('/migration', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							dbId: Number(dbId),
							projectId: Number(projectId),
						}),
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const result = await response.json();
					if (Array.isArray(result)) {
						dispatch(setMigrationVersions(result));
					} else {
						console.error('Expected array but got:', result);
						dispatch(setMigrationVersions([]));
					}
				} catch (error) {
					console.error('Error running migrations:', error);
				}
				break;
			case 'Repair':
				console.log('chose repair');
		}
	};

	const handleConnectionStringInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(setConnectionString(e.target.value));
	};

	const handledbNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setDbName(e.target.value));
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = sessionStorage.getItem('token');
			if (dbName || connectionString) {
				const response = await fetch('/db/addConnectionString', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						db_name: dbName,
						connection_string: connectionString,
						projectId: selectedProjectId,
					}),
				});
				if (response.ok) {
					const result = await response.json();
					const databaseCopy = JSON.parse(JSON.stringify(databases));
					databaseCopy.push(result);
					dispatch(setDatabases(databaseCopy));
					dispatch(setDbName(''));
					dispatch(setConnectionString(''));
					dispatch(setShowInput(false));
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleChooseDatabase = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			setdbId(!e.target.value ? '' : e.target.selectedOptions[0].dataset.dbId)
		);
		dispatch(setSelectedDatabase(e.target.value));
		dispatch(setSelectedMigration(''));
		dispatch(setSelectedScript(''));
	};

	const mapDatabaseOptions = databases.map(
		(db: { db_id: string; db_name: string }) => (
			<option key={db.db_id} value={db.db_name} data-db-id={db.db_id}>
				{db.db_name}
			</option>
		)
	);

	const handleTrashButton = () => {
		if (selectedDatabase && !isOpen) setIsOpen(true);
		else if (selectedDatabase && isOpen) setIsOpen(false);
	};

	const handlePopperYes = () => {
		dispatch(setSelectedDatabase(''));
		dispatch(setSelectedScript(''));
		handleButtonClick('deletedb');
		setIsOpen(false);
	};

	return (
		<div className="sidePanel">
			<div className="currProject">
				<label>Project: {selectedProject}</label>
			</div>
			<div id="dbdropdown">
				<p className="font-bold">Database</p>
				<div className="selectdb">
					<select value={selectedDatabase} onChange={handleChooseDatabase}>
						<option value="">Select</option>
						{mapDatabaseOptions}
					</select>
				</div>
			</div>
			<div className="addDeleteButtons">
				{userRole === 'Admin' || userRole === 'Owner' ? (
					<div className="addDb">
						<div className="addDbBtn">
							<button
								className="purplebtn btn"
								aria-label="add database"
								onClick={e => handleButtonClick('adddb')}
							>
								<FontAwesomeIcon icon={faDatabase} />{' '}
							</button>
							<p id="textbox">Add database</p>
						</div>

						{userRole === 'Admin' || userRole === 'Owner' ? (
							<div className="removedb">
								<button
									className="whitebtn"
									aria-label="remove database"
									ref={referenceElement}
									onClick={handleTrashButton}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</button>
								{isOpen ? null : <p id="textbox">Remove database</p>}
								{selectedDatabase && isOpen && (
									<div className="popper" ref={popperElement}>
										<p>Are you sure?</p>
										<div className="popperbtns">
											<button className="whitebtn" onClick={handlePopperYes}>
												Yes
											</button>
											<button
												className="whitebtn"
												onClick={() => {
													setIsOpen(false);
												}}
											>
												No
											</button>
										</div>
									</div>
								)}
							</div>
						) : null}
					</div>
				) : null}
			</div>
			{showInput && (
				<form onSubmit={handleFormSubmit}>
					<input
						type="text"
						value={dbName}
						onChange={handledbNameInputChange}
						placeholder="Enter database name"
					/>
					<input
						type="text"
						value={connectionString}
						onChange={handleConnectionStringInputChange}
						placeholder="Enter connection string"
					/>
					<button className="whitebtn addbtn font-bold" type="submit">
						+
					</button>
				</form>
			)}
			<div id="chooseaction">
				<p className="font-bold">Action</p>
				<div className="dropAndBtn">
					<select
						value={selectedAction}
						aria-label="choose an action"
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							dispatch(setSelectedAction(e.target.value));
						}}
					>
						{actions.map((action: string) => (
							<option key={action} value={action}>
								{action}
							</option>
						))}
					</select>
					<button
						className="purplebtn"
						onClick={() => handleExecute(selectedAction)}
					>
						<FontAwesomeIcon icon={faScroll} />
					</button>
				</div>
				<div className="actiondesc">
					{selectedAction === 'Migrate' ? (
						<p>
							Schema migration involves updating the database schema to a new
							version, typically to accommodate changes in application
							requirements, data structure, or performance optimization.
						</p>
					) : selectedAction === 'Clean' ? (
						<p>
							Cleaning the database typically involves removing redundant,
							obsolete, or erroneous data to improve performance, reduce storage
							space, and ensure data integrity.
						</p>
					) : selectedAction === 'Repair' ? (
						<p>
							Database repair involves identifying and fixing issues such as
							corrupted or inconsistent data, damaged indexes, or other
							structural problems to restore the database's functionality and
							reliability.
						</p>
					) : selectedAction === 'Undo' ? (
						<p>
							Undoing database changes reverses recent modifications, restoring
							the database to a previous state. This action is useful for
							correcting mistakes or reverting unintended alterations to the
							database schema or data.
						</p>
					) : null}
				</div>
			</div>
			<div className="previewTable">
				<p className="font-bold">Preview Table</p>
				<select
					value={selectedTable}
					aria-label="preview table"
					onChange={e => dispatch(setSelectedTable(e.target.value))}
				>
					<option value="">Select</option>
				</select>
			</div>
		</div>
	);
};

export default SidePanel;
