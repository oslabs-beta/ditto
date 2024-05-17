// MigrationPage
import React, { useState, useEffect } from 'react';
import { products, customers, orders, suppliers } from './mockData';

interface Table {
	name: string;
}

// Hardcoded table data
const mockTables: Table[] = [
	{ name: 'products' },
	{ name: 'customers' },
	{ name: 'orders' },
	{ name: 'suppliers' },
];

const MigrationPage: React.FC = () => {
	const [tables, setTables] = useState<Table[]>([]);
	const [selectedTable, setSelectedTable] = useState<string>('');

	useEffect(() => {
		fetch('http://localhost:3001/')
			.then(response => response.json())
			.then(data => {
				setTables(data);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<label>
					Select a Table:
					<select
						value={selectedTable}
						onChange={e => setSelectedTable(e.target.value)}
					>
						{mockTables.map((table, index) => (
							<option key={index} value={table.name}>
								{table.name}
							</option>
						))}
					</select>
				</label>
			</header>
		</div>
	);
};

export default MigrationPage;
