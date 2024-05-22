// App.tsx (or any other component where you want to use the NavBarComponent)

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route as Route } from 'react-router-dom';
import { Routes as Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import favicon from '/client/src/assets/favicon.svg';
import logoImage from './assets/logo.png';
import MigrationPage from './pages/MigrationPage';
import SignUpPage from './pages/SignUpPage';
import GitHubCallBack from './components/GitHubCallBack';
import DocumentationPage from './pages/DocumentationPage';
import CommunityPage from './pages/CommunityPage';
import FAQPage from './pages/FAQPage';
import MainPage from './pages/MainPage';
import AddMigrationsPage from './pages/AddMigrationsPage';
import UpdateMigrationsPage from './pages/UpdateMigrationsPage';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<NavBar logo={logoImage} />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/updateMigrations" element={<UpdateMigrationsPage />} />
					<Route path="/github/callback" element={<GitHubCallBack />} />
					<Route path="/addMigrations" element={<AddMigrationsPage />} />
					<Route path="/migration" element={<MigrationPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/documentation" element={<DocumentationPage />} />
					<Route path="/community" element={<CommunityPage />} />
					<Route path="/faq" element={<FAQPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
