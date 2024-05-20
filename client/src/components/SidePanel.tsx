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

	useEffect(() => {
		const fetchDatabases = async () => {
			try {
				const response = await fetch('/api/user/databases', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer YOUR_JWT_TOKEN`, // Replace with your JWT token logic
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const result = await response.json();
				dispatch(setDatabases(result.databases));
			} catch (error) {
				console.error('Error fetching databases:', error);
			}
		};

		fetchDatabases();
	}, [dispatch]);

	const handleButtonClick = () => {
		dispatch(setShowInput(true));
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
			const response = await fetch('/db/addConnectionString', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ dbName, connectionString }),
			});
			const result = await response.json();
			console.log('Success:', result);
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
					onChange={e => dispatch(setSelectedDatabase(e.target.value))}
				>
					<option value="">--Select a database--</option>
					{databases.map((db_Name: string) => (
						<option key={db_Name} value={db_Name}>
							{db_Name}
						</option>
					))}
				</select>
				{/* database */}
				{/* connection string form */}
				<div>
					<button onClick={handleButtonClick}>+</button>
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
