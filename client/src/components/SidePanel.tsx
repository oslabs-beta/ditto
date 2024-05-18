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

	// const sidePanelStyle: React.CSSProperties = {
	// 	width: '25%',
	// 	padding: '10px',
	// 	backgroundColor: '#f1f1f1',
	// 	borderRight: '1px solid #ccc',
	// 	overflowY: 'auto',
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// };

	const labelStyle: React.CSSProperties = {
		marginBottom: '20px',
	};

	return (
		<div>
			<header>
				{/* database */}
				<label style={labelStyle}>
					Choose Database:
					<select
						value={selectedDatabase}
						onChange={e => setSelectedDatabase(e.target.value)}
					>
						<option value="">--Select a database--</option>
						<option value="db1">Database 1</option>
						<option value="db2">Database 2</option>
					</select>
				</label>
				{/* database */}

				{/* migration */}
				<label style={labelStyle}>
					Choose Migration:
					<select
						value={selectedMigration}
						onChange={e => setSelectedMigration(e.target.value)}
					>
						<option value="">--Select a migration--</option>
						<option value="migration1">Migration 1</option>
						<option value="migration2">Migration 2</option>
					</select>
				</label>
				{/* migration */}

				<label style={labelStyle}>
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
				</label>

				{renderTableData()}
			</header>
		</div>
	);
};

export default SidePanel;
