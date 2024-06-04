import * as React from 'react';
import Community from '../components/Community';
import Documentation from '../components/Documentation';
import { Helmet } from 'react-helmet-async'
import '../styles/pages/MainPage.css';
import '../styles/Global.css';

const MainPage: React.FC = () => {
	return (
		<div className="content-container">
			<Helmet>
				<title>D.I.T.T.O. Main Page</title>
				<meta name="description" content="Welcome to D.I.T.T.O., a powerful tool for managing and tracking PostgreSQL database migrations."/>
			</Helmet>
			<div className="landing">
				<h1 className='sectionTitle'>Dream Team Inc. presents:<br />D.I.T.T.O.</h1>
			</div>
			<div>
				<Documentation />
				<Community />
			</div>
		</div>
	);
};

export default MainPage;
