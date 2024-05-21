import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import '/client/src/styles/MigrationPage.css';

const MigrationPage: React.FC = () => {
	const [code, setCode] = useState('-- Write your PostgreSQL script here');

	const handleCodeChange = (newCode: string) => {
		setCode(newCode);
	};

	const handleRunScript = () => {
		console.log('Running script:', code);
	};

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
