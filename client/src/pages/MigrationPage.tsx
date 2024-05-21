import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import '../styles.css';

const MigrationPage: React.FC = () => {
	return (
		<div className="migrationPage">
			<div className="sidePanel">
				<SidePanel />
			</div>
			<div className="content">
				<MigrationScripts />
			</div>
		</div>
	);
};

export default MigrationPage;
