import React, { useState } from 'react';
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

	// Function to render table data dynamically based on the selected table
	const renderTableData = () => {
		let tableData: JSX.Element | null = null;

		switch (selectedTable) {
			case 'products':
				tableData = (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product: Product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.name}</td>
									<td>${product.price.toFixed(2)}</td>
									<td>{product.category}</td>
								</tr>
							))}
						</tbody>
					</table>
				);
				break;
			case 'customers':
				tableData = (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer: Customer) => (
								<tr key={customer.id}>
									<td>{customer.id}</td>
									<td>{customer.firstName}</td>
									<td>{customer.lastName}</td>
									<td>{customer.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				);
				break;
			case 'orders':
				tableData = (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Customer ID</th>
								<th>Product ID</th>
								<th>Order Date</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order: Order) => (
								<tr key={order.id}>
									<td>{order.id}</td>
									<td>{order.customerId}</td>
									<td>{order.productId}</td>
									<td>{order.orderDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				);
				break;
			case 'suppliers':
				tableData = (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Contact Info</th>
							</tr>
						</thead>
						<tbody>
							{suppliers.map((supplier: Supplier) => (
								<tr key={supplier.id}>
									<td>{supplier.id}</td>
									<td>{supplier.name}</td>
									<td>{supplier.contactInfo}</td>
								</tr>
							))}
						</tbody>
					</table>
				);
				break;
			default:
				tableData = <p>Please select a table.</p>;
		}

		return tableData;
	};

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
					<option value="db1">Database 1</option>
					<option value="db2">Database 2</option>
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
				{renderTableData()}
			</header>
		</div>
	);
};

export default SidePanel;
