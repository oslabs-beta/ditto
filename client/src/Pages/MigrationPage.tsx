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
} from '../components/mockData';
import CodeEditor from '../components/CodeEditor'; // CodeEditor
import SidePanel from '../components/SidePanel';

const MigrationPage: React.FC = () => {
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

	const migrationPageStyle: React.CSSProperties = {
		display: 'flex',
		height: '88vh',
	};

	const sidePanelStyle: React.CSSProperties = {
		width: '15%',
		padding: '10px',
		backgroundColor: '#f1f1f1',
		borderRight: '1px solid #ccc',
		overflowY: 'auto',
	};

	const contentStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		width: '75%',
		padding: '10px',
	};

	const codeEditorContainerStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		// alignItems: 'flex-end', // get rid of this so CodeBox fills up all the way to the sidePanel
		justifyContent: 'flex-end',
		height: '100%',
	};

	const codeEditorStyle: React.CSSProperties = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
	};

	const migrationTableContainerStyle: React.CSSProperties = {
		flex: 1,
		marginBottom: '20px',
	};

	const tableStyle: React.CSSProperties = {
		width: '100%',
		borderCollapse: 'collapse',
	};

	const thStyle: React.CSSProperties = {
		border: '1px solid #ccc',
		padding: '8px',
		textAlign: 'left',
		backgroundColor: '#f2f2f2',
	};

	const tdStyle: React.CSSProperties = {
		border: '1px solid #ccc',
		padding: '8px',
	};

	const titleStyle: React.CSSProperties = {
		textAlign: 'left',
		marginBottom: '10px',
		fontSize: '1.2em',
	};

	return (
		<div style={migrationPageStyle}>
			<div style={sidePanelStyle}>
				<SidePanel />
			</div>
			<div style={contentStyle}>
				<div style={migrationTableContainerStyle}>
					<div style={titleStyle}>Migration Table</div>
					<table style={tableStyle}>
						<thead>
							<tr>
								<th style={thStyle}>Version</th>
								<th style={thStyle}>Description</th>
								<th style={thStyle}>Date Migrated</th>
								<th style={thStyle}>State</th>
								<th style={thStyle}>Execution Time</th>
							</tr>
						</thead>
						<tbody>
							{/* Sample row */}
							<tr>
								<td style={tdStyle}>1.0.0</td>
								<td style={tdStyle}>Initial Migration</td>
								<td style={tdStyle}>2024-05-17</td>
								<td style={tdStyle}>Success</td>
								<td style={tdStyle}>30s</td>
							</tr>
							{/* Add more rows as needed */}
						</tbody>
					</table>
				</div>
				<div style={codeEditorContainerStyle}>
					<div style={codeEditorStyle}>
						<CodeEditor initialCode={code} onCodeChange={handleCodeChange} />
						<button onClick={handleRunScript}>Run Script</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MigrationPage;
