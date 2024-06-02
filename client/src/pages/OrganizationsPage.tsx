import * as React from 'react';
import OrganizationsPanel from '../components/OrganizationsPanel';
import '../styles/OrganizationsPage.css';

const OrganizationsPage: React.FC = () => {
	return (
		<div className="organizationsPage">
			<OrganizationsPanel />
		</div>
	);
};

export default OrganizationsPage;
