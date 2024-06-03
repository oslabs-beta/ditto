import * as React from 'react';
import OrganizationsPanel from '../components/ProjectsPanel';
import UsersTable from '../components/UsersTable';
import '../styles/ProjectsPage.css';

const OrganizationsPage: React.FC = () => {
	return (
		<div className="projectsPage">
			<OrganizationsPanel />
			<UsersTable />
		</div>
	);
};

export default OrganizationsPage;
