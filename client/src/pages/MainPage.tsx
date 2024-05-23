import * as React from 'react';
import Community from '../components/Community';
import '../styles/MainPage.css';
import DocumentationPage from './DocumentationPage';

const MainPage: React.FC = () => {
	return (
		<div className="content-container">
			<div className="landing">
				<h1>Welcome to DITTO</h1>
			</div>
			<div>
				<DocumentationPage />
				<Community />
			</div>
		</div>
	);
};

export default MainPage;
