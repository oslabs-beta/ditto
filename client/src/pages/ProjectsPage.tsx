import * as React from 'react';
import ProjectsPanel from '../components/ProjectsPanel';
import UsersTable from '../components/UsersTable';
import '../styles/pages/ProjectsPage.css';

const OrganizationsPage: React.FC = () => {
	return (
		<div className="projectsPage">
			<ProjectsPanel />
			<UsersTable />
		</div>
	);
};

export default OrganizationsPage;
