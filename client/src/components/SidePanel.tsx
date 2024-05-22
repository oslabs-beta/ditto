// SidePanel.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setSelectedTable,
	setSelectedDatabase,
	setSelectedMigration,
	setShowInput,
	setDbName,
	setConnectionString,
	setDatabases,
	setMigrationVersions,
	setdbId,
} from '../store';

const SidePanel: React.FC = () => {
	const dispatch = useDispatch();
	const selectedTable = useSelector((state: any) => state.selectedTable);
	const selectedDatabase = useSelector((state: any) => state.selectedDatabase);
	const selectedMigration = useSelector(
		(state: any) => state.selectedMigration
	);
	const showInput = useSelector((state: any) => state.showInput);
	const dbName = useSelector((state: any) => state.dbName);
	const connectionString = useSelector((state: any) => state.connectionString);
	const databases = useSelector((state: any) => state.databases);
	const selectedDbId = useSelector((state: { dbId: string }) => state.dbId);
	const migrationVersions = useSelector(
		(state: any) => state.migrationVersions
	);

	useEffect(() => {
		const fetchDatabases = async () => {
			const token = sessionStorage.getItem('token');
			console.log(token);
			try {
				const response = await fetch('/db/connectionStrings', {
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
				console.log(result);
				// const dbNames: string[] = result.map(
				// 	(obj: { db_name: string }) => obj.db_name
				// );
				// console.log('databases: ', dbNames);
				//
				// const dbId: string[] = result.map(
				// 	(obj: { db_id: string }) => obj.db_id
				// );
				// console.log('dbid: ', dbIds);

				dispatch(setDatabases(result));
			} catch (error) {
				console.error('Error fetching databases:', error);
			}
		};
		fetchDatabases();
	}, []);

	const handleButtonClick = async (btnText: string | null) => {
		if (btnText === '+') {
			dispatch(setShowInput(true));
		} else if (btnText === 'x') {
			dispatch(setShowInput(false));
		} else {
			if (selectedDatabase) {
				const token = sessionStorage.getItem('token');
				console.log(token);
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
				// if response is ok we need backend to query for databases again so i can dispatch setdatabases here again
				// Maybe backend can have a controller for querying for databases again. so fetch for getDBConnectionByUserId
				// and set dispatch setDatabases here again
				if (response.ok) {
					const result = await response.json();
					const databaseCopy = JSON.parse(JSON.stringify(databases));
					databaseCopy.push(result);
					dispatch(setDatabases(databaseCopy));
					dispatch(setShowInput(false));
				}
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<header>
				{/* database */}
				Choose Database:
				<select
					value={selectedDatabase}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						dispatch(setdbId(e.target.selectedOptions[0].dataset.dbId));
						dispatch(setSelectedDatabase(e.target.value));
					}}
				>
					{/* [ { db1: 30}, {db2: 40}] */}
					<option value="">--Select a database--</option>
					{databases.map((db: { db_id: string; db_name: string }) => (
						<option key={db.db_id} value={db.db_name} data-db-id={db.db_id}>
							{db.db_name}
						</option>
					))}
				</select>
				<button
					onClick={e =>
						handleButtonClick((e.target as HTMLElement).textContent)
					}
				>
					Remove Database
				</button>
				{/* database */}
				{/* connection string form */}
				<div>
					<button
						onClick={e =>
							handleButtonClick((e.target as HTMLElement).textContent)
						}
					>
						+
					</button>
					<button
						onClick={e =>
							handleButtonClick((e.target as HTMLElement).textContent)
						}
					>
						x
					</button>
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
							<button type="submit">Submit</button>
						</form>
					)}
				</div>
				{/* connection string form */}
				{/* migration */}
				<br />
				Choose Migration:
				<select
					value={selectedMigration}
					onChange={e => dispatch(setSelectedMigration(e.target.value))}
				>
					<option value="">--Select a migration--</option>
					{/* <option value="migration1">Migration 1</option>
					<option value="migration2">Migration 2</option> */}
				</select>
				{/* migration */}
				<br />
				Choose Table:
				<select
					value={selectedTable}
					onChange={e => dispatch(setSelectedTable(e.target.value))}
				>
					<option value="">--Select a table--</option>
					{/* <option value="products">Products</option>
					<option value="customers">Customers</option>
					<option value="orders">Orders</option>
					<option value="suppliers">Suppliers</option> */}
				</select>
			</header>
		</div>
	);
};

export default SidePanel;
