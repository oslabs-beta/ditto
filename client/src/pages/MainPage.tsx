import * as React from 'react';
import Community from '../components/Community';
import '../styles/MainPage.css';
import Documentation from '../components/Documentation';
import { Helmet } from 'react-helmet-async';

const MainPage: React.FC = () => {
	return (
		<div className="content-container">
			<Helmet>
				<title>Welcome to Ditto</title>
				<meta
					name="description"
					content="Welcome to Ditto, a powerful tool for managing and tracking PostgreSQL database migrations."
				/>
			</Helmet>
			<div className="landing"></div>
			<div>
				<Documentation />
				{/* <Community /> */}
			</div>
		</div>
	);
};

export default MainPage;
