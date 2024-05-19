// Define interfaces for your data to ensure type safety.
export interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
}

export interface Customer {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

export interface Order {
	id: number;
	customerId: number;
	productId: number;
	orderDate: string;
}

export interface Supplier {
	id: number;
	name: string;
	contactInfo: string;
}

// Define and export mock data arrays.
export const products: Product[] = [
	{ id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
	{ id: 2, name: 'Chair', price: 59.99, category: 'Furniture' },
	{ id: 3, name: 'Smartphone', price: 499.99, category: 'Electronics' },
	{ id: 4, name: 'Table', price: 150.0, category: 'Furniture' },
	{ id: 5, name: 'Bluetooth Speaker', price: 29.99, category: 'Electronics' },
	{ id: 6, name: 'Lamp', price: 22.99, category: 'Home Decor' },
];

export const customers: Customer[] = [
	{ id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
	{
		id: 2,
		firstName: 'Jane',
		lastName: 'Smith',
		email: 'janesmith@example.com',
	},
	{
		id: 3,
		firstName: 'Alice',
		lastName: 'Johnson',
		email: 'alicejohnson@example.com',
	},
	{ id: 4, firstName: 'Bob', lastName: 'Brown', email: 'bobbrown@example.com' },
];

export const orders: Order[] = [
	{ id: 1, customerId: 1, productId: 3, orderDate: '2021-09-15' },
	{ id: 2, customerId: 4, productId: 1, orderDate: '2021-09-17' },
	{ id: 3, customerId: 2, productId: 4, orderDate: '2021-09-18' },
	{ id: 4, customerId: 3, productId: 5, orderDate: '2021-09-20' },
];

export const suppliers: Supplier[] = [
	{ id: 1, name: 'Global Tech', contactInfo: 'techsupport@gtech.com' },
	{
		id: 2,
		name: 'Office Furnishings',
		contactInfo: 'contact@officefurnish.com',
	},
	{ id: 3, name: 'SmartElectro', contactInfo: 'support@smartelectro.com' },
];

// add this function to sidepanel component if you want to use the mock data
// // Function to render table data dynamically based on the selected table
// const renderTableData = () => {
// 	let tableData: JSX.Element | null = null;

// 	switch (selectedTable) {
// 		case 'products':
// 			tableData = (
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>ID</th>
// 							<th>Name</th>
// 							<th>Price</th>
// 							<th>Category</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{products.map((product: Product) => (
// 							<tr key={product.id}>
// 								<td>{product.id}</td>
// 								<td>{product.name}</td>
// 								<td>${product.price.toFixed(2)}</td>
// 								<td>{product.category}</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			);
// 			break;
// 		case 'customers':
// 			tableData = (
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>ID</th>
// 							<th>First Name</th>
// 							<th>Last Name</th>
// 							<th>Email</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{customers.map((customer: Customer) => (
// 							<tr key={customer.id}>
// 								<td>{customer.id}</td>
// 								<td>{customer.firstName}</td>
// 								<td>{customer.lastName}</td>
// 								<td>{customer.email}</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			);
// 			break;
// 		case 'orders':
// 			tableData = (
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>ID</th>
// 							<th>Customer ID</th>
// 							<th>Product ID</th>
// 							<th>Order Date</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{orders.map((order: Order) => (
// 							<tr key={order.id}>
// 								<td>{order.id}</td>
// 								<td>{order.customerId}</td>
// 								<td>{order.productId}</td>
// 								<td>{order.orderDate}</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			);
// 			break;
// 		case 'suppliers':
// 			tableData = (
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>ID</th>
// 							<th>Name</th>
// 							<th>Contact Info</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{suppliers.map((supplier: Supplier) => (
// 							<tr key={supplier.id}>
// 								<td>{supplier.id}</td>
// 								<td>{supplier.name}</td>
// 								<td>{supplier.contactInfo}</td>
// 							</tr>
// 						))}
// 					</tbody>
// 				</table>
// 			);
// 			break;
// 		default:
// 			tableData = <p>Please select a table.</p>;
// 	}

// 	return tableData;
// };
