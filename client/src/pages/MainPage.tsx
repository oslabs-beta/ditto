import * as React from 'react';
import Community from '../components/Community';
import DocumentationPage from '../components/Documentation';
import { Helmet } from 'react-helmet-async'
import '../styles/pages/MainPage.css';

const MainPage: React.FC = () => {
	return (
		<div className="content-container">
			<Helmet>
				<title>Welcome to Ditto</title>
				<meta name="description" content="Welcome to Ditto, a powerful tool for managing and tracking PostgreSQL database migrations."/>
			</Helmet>
			<div className="landing">
				<h1 className='sectionTitle'>Welcome to DITTO</h1>
			</div>
			<div>
				<DocumentationPage />
				<Community />
			</div>
		</div>
	);
};

export default MainPage;
