import React, { useState } from 'react';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import '/client/src/styles/MigrationPage.css';

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
