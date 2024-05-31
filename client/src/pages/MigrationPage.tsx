import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import SidePanel from '../components/SidePanel';
import MigrationScripts from '../components/MigrationScripts';
import { Helmet } from 'react-helmet-async';
import '/client/src/styles/MigrationPage.css';

const MigrationPage: React.FC = () => {
	return (
		<div className="migrationPage">
			<Helmet>
				<title>Migrations - Ditto</title>
				<meta name="description" content="Manage and track your database migration scripts using Ditto." />
			</Helmet>
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
