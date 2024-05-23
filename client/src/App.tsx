// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import MigrationPage from './pages/MigrationPage';
import SignUpPage from './pages/SignUpPage';
import GitHubCallBack from './components/GitHubCallBack';
import DocumentationPage from './pages/DocumentationPage';
import Community from './components/Community';
import FAQPage from './pages/FAQPage';
import MainPage from './pages/MainPage';
import AddMigrationsPage from './pages/AddMigrationsPage';
import UpdateMigrationsPage from './pages/UpdateMigrationsPage';
import logoImage from './assets/logo.png';

const App: React.FC = () => {
	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
		{ path: '/migration', label: 'Migration' },
		{ path: '/login', label: 'Login' },
		{ path: '/signup', label: 'Signup' },
	];

	return (
		<Router>
			<div>
				<NavBar links={navLinks} logo={logoImage} />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/updateMigrations" element={<UpdateMigrationsPage />} />
					<Route path="/github/callback" element={<GitHubCallBack />} />
					<Route path="/addMigrations" element={<AddMigrationsPage />} />
					<Route path="/migration" element={<MigrationPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/documentation" element={<DocumentationPage />} />
					<Route path="/faq" element={<FAQPage />} />
					<Route path="/community" element={<Community />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
