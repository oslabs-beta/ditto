// MigrationPage.tsx
import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import '../styles.css';

const MigrationPage: React.FC = () => {
	const [code, setCode] = useState('-- Write your PostgreSQL script here');

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleRunScript = () => {
		console.log('Running script:', code);
	};

	// const migrationPageStyle: React.CSSProperties = {
	// 	display: 'flex',
	// 	height: '88vh',
	// };

	// const sidePanelStyle: React.CSSProperties = {
	// 	width: '15%',
	// 	padding: '10px',
	// 	backgroundColor: '#f1f1f1',
	// 	borderRight: '1px solid #ccc',
	// 	overflowY: 'auto',
	// };

	// const contentStyle: React.CSSProperties = {
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	width: '75%',
	// 	padding: '10px',
	// };

	// const codeEditorContainerStyle: React.CSSProperties = {
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	justifyContent: 'flex-end',
	// 	height: '100%',
	// };

	// const codeEditorStyle: React.CSSProperties = {
	// 	flex: 1,
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	justifyContent: 'flex-end',
	// };

	// const migrationTableContainerStyle: React.CSSProperties = {
	// 	flex: 1,
	// 	marginBottom: '20px',
	// };

	// const tableStyle: React.CSSProperties = {
	// 	width: '100%',
	// 	borderCollapse: 'collapse',
	// };

	// const thStyle: React.CSSProperties = {
	// 	border: '1px solid #ccc',
	// 	padding: '8px',
	// 	textAlign: 'left',
	// 	backgroundColor: '#f2f2f2',
	// };

	// const tdStyle: React.CSSProperties = {
	// 	border: '1px solid #ccc',
	// 	padding: '8px',
	// };

	// const titleStyle: React.CSSProperties = {
	// 	textAlign: 'left',
	// 	marginBottom: '10px',
	// 	fontSize: '1.2em',
	// };

	return (
		<div className="migrationPage">
			<div className="sidePanel">
				<SidePanel />
			</div>
			<div className="content">
				<MigrationScripts />
				<div className="codeEditorContainer">
					<div className="codeEditor">
						<CodeEditor initialCode={code} onCodeChange={handleCodeChange} />
						<button onClick={handleRunScript}>Run Script</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MigrationPage;
