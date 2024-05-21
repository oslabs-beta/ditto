import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import AddMigrationsPage from './AddMigrationsPage';
import '../styles.css';

const MigrationPage: React.FC = () => {
	const navigate = useNavigate();
	const [code, setCode] = useState('-- Write your PostgreSQL script here');

	/* Add Migrations Button */
	const handleFormSubmit = (data: {
		version: string;
		description: string;
		script: string;
	}) => {
		console.log('Form Data:', data);
	};
	/* Add Migrations Button */

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleRunScript = () => {
		console.log('Running script:', code);
	};

	const handleSubmit = () => {
		console.log('went into handleSubmit');
		navigate('/addMigrations');
	};

	return (
		<div className="migrationPage" onClick={handleSubmit}>
			<div className="sidePanel">
				<SidePanel />
			</div>
			{/* Add Migrations Button */}
			<button type="button">Add Migration</button>
			{/* <AddMigrations onSubmit={handleFormSubmit} /> */}

			{/* Add Migrations Button */}
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
