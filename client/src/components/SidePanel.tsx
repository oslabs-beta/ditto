// SidePanel.tsx
import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
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

	const selectedMigration = useSelector(
		(state: any) => state.selectedMigration
	);
	const showInput = useSelector((state: any) => state.showInput); // we can probably get rid of this, since its only used in SidePanel

	const dbName = useSelector((state: any) => state.dbName);
	const connectionString = useSelector((state: any) => state.connectionString);
	const databases = useSelector((state: any) => state.databases);
	const selectedDbId = useSelector((state: { dbId: string }) => state.dbId);
	const selectedAction = useSelector(
		(state: { selectedAction: string }) => state.selectedAction
	);
	const currentProject = useSelector((state: any) => state.currentProject);
	const userRole = useSelector((state: any) => state.userRole);
	const [isOpen, setIsOpen] = useState(false);
	const referenceElement = useRef<HTMLButtonElement>(null);
	const popperElement = useRef<HTMLDivElement>(null);
	const dbId = useSelector((state: any) => state.dbId);
	const selectedScript = useSelector(
		(state: { selectedScript: string }) => state.selectedScript
	);
	const token = sessionStorage.getItem('token');
	const actions = ['Migrate', 'Repair', 'Undo', 'Clean'];

	useEffect(() => {
		const fetchDatabases = async () => {
			try {
				const response = await fetch('/db/connectionStrings', {
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
				console.log('result: ', result);
				dispatch(setDatabases(result));
				console.log('databases: ', databases);
			} catch (error) {
				console.error('Error fetching databases:', error);
			}
		};
		fetchDatabases();
	}, []);

	const handleButtonClick = async (btnText: string | null) => {
		if (btnText === 'adddb') {
			dispatch(setShowInput(showInput ? false : true));
		} else {
			if (selectedDatabase) {
				try {
					const response = await fetch(
						`/db/deleteConnectionString/${selectedDbId}`,
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
						body: JSON.stringify({ dbId: Number(dbId) }),
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					console.log('result:', response);
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
	/* For Adding Database */
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

	/* Dropdown Logic */
	const handleChooseDatabase = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			setdbId(!e.target.value ? '' : e.target.selectedOptions[0].dataset.dbId)
		);
		dispatch(setSelectedDatabase(e.target.value));
		dispatch(setSelectedMigration(''));
	};

	const mapDatabaseOptions = databases.map(
		(db: { db_id: string; db_name: string }) => (
			<option key={db.db_id} value={db.db_name} data-db-id={db.db_id}>
				{db.db_name}
			</option>
		)
	);

	/* Button Logic */
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
		<div id="sidecontainer">
			{/* database */}
			<p className="font-bold">{currentProject}</p>
			<div id="dbdropdown">
				<p className="font-bold">Choose Database</p>
				<div className="selectdb">
					<select value={selectedDatabase} onChange={handleChooseDatabase}>
						<option value="">-- Select a database --</option>
						{mapDatabaseOptions}
					</select>
					{userRole === 'admin' || userRole === 'owner' ? (
						<div className="removedb">
							<button
								className="whitebtn"
								aria-label="remove database"
								ref={referenceElement}
								onClick={handleTrashButton}
							>
								<FontAwesomeIcon icon={faTrashAlt} style={{ color: 'black' }} />
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
			</div>
			{/* connection string form */}
			{userRole === 'admin' || userRole === 'owner' ? (
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
				</div>
			) : null}
			<div id="chooseaction">
				<p className="font-bold">Choose Action</p>
				<div>
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
						Execute
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
			<div>
				<p className="font-bold">Preview Table:</p>
				<select
					value={selectedTable}
					aria-label="preview table"
					onChange={e => dispatch(setSelectedTable(e.target.value))}
				>
					<option value="">--Select a table--</option>
				</select>
			</div>
		</div>
	);
};

export default SidePanel;
