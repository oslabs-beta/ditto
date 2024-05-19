import React, { useState, useEffect } from 'react';
import {
	Product,
	Customer,
	Order,
	Supplier,
	products,
	customers,
	orders,
	suppliers,
} from './mockData';

const SidePanel: React.FC = () => {
	const [selectedTable, setSelectedTable] = useState<string>('');
	const [selectedDatabase, setSelectedDatabase] = useState<string>(''); // database
	const [selectedMigration, setSelectedMigration] = useState<string>(''); // migration
	const [showInput, setShowInput] = useState(false); // connection string
	const [dbName, setdbName] = useState(''); // dbName
	const [connectionString, setConnectionString] = useState(''); // connection string
	const [databases, setDatabases] = useState<string[]>([]); // state for databases belonged to user

	// databases belonged to user //
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
				setDatabases(result.databases);
			} catch (error) {
				console.error('Error fetching databases:', error);
			}
		};
		// databases belonged to user //

		fetchDatabases();
	}, []);

	// connection string //
	const handleButtonClick = () => {
		setShowInput(true);
	};

	const handleConnectionStringInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConnectionString(e.target.value);
	};

	const handledbNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setdbName(e.target.value);
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
	// connection string //

	return (
		<div>
			<header>
				{/* database */}
				Choose Database:
				<select
					value={selectedDatabase}
					onChange={e => setSelectedDatabase(e.target.value)}
				>
					<option value="">--Select a database--</option>
					{databases.map(db => (
						<option key={db} value={db}>
							{db}
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
					onChange={e => setSelectedMigration(e.target.value)}
				>
					<option value="">--Select a migration--</option>
					<option value="migration1">Migration 1</option>
					<option value="migration2">Migration 2</option>
				</select>
				{/* migration */}
				<br />
				Choose Table:
				<select
					value={selectedTable}
					onChange={e => setSelectedTable(e.target.value)}
				>
					<option value="">--Select a table--</option>
					<option value="products">Products</option>
					<option value="customers">Customers</option>
					<option value="orders">Orders</option>
					<option value="suppliers">Suppliers</option>
				</select>
				{/* {renderTableData()} // uncomment if you re-add the mock data */}
			</header>
		</div>
	);
};

export default SidePanel;
