import * as React from 'react';
import Community from '../components/Community';
import '../styles/LandingPage.css';
import Documentation from '../components/Documentation';
import migration from '../assets/img/migrations.webp';
import addMigration from '../assets/img/addmigrations.webp';
import logo from '../assets/logo.webp';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const getStarted = () => {
		navigate('/signup');
	};
	const getDocumentation = () => {
		navigate('/faq');
	};

	return (
		<div className="content-container">
			<Helmet>
				<title>Welcome to Ditto</title>
				<meta
					name="description"
					content="Welcome to Ditto, a powerful tool for managing and tracking PostgreSQL database migrations."
				/>
			</Helmet>
			<div className="gradient-container">
				<div className="text-buttons">
					<div className="text-section">
						<h1>DITTO</h1>
						<img src={logo} alt="Image 1" className="mainLogo" />
						<p>
							"Seamless data schema migration tool, to help developers make
							secure collaborative changes to their PostgreSQL databases."
						</p>
						<div className="buttons-section">
							<button onClick={getStarted}>Get Started</button>
							<button onClick={getDocumentation}>How to Use</button>
						</div>
					</div>
				</div>
				<div className="image-section">
					{/* <img src={logo} alt="Description of your image" /> */}
					<div className="image-container">
						<img src={migration} alt="Image 1" className="image1" />
						<img src={addMigration} alt="Image 2" className="image2" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
