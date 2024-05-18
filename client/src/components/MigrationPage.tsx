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
import CodeEditor from './CodeEditor'; // CodeEditor

const MigrationPage: React.FC = () => {
	const [selectedTable, setSelectedTable] = useState<string>('');
	const [code, setCode] = useState('-- Write your PostgreSQL script here'); // CodeEditor

	// CodeEditor
	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	// CodeEditor
	const handleRunScript = () => {
		// Logic to execute the PostgreSQL script goes here
		console.log('Running script:', code);
	};

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
		<div className="App">
			<header className="App-header">
				{/* CodeEditor */}
				<div>
					<h1>PostgreSQL Script Editor</h1>
					<CodeEditor initialCode={code} onCodeChange={handleCodeChange} />

					<button onClick={handleRunScript}>Run Script</button>
				</div>
				{/* Code Editor */}
				<label>
					Select a Table:
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
				</label>
				{renderTableData()}
			</header>
		</div>
	);
};

export default MigrationPage;
