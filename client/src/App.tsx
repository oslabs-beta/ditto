import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import MigrationPage from './pages/MigrationPage';
import SignUpPage from './pages/SignUpPage';
import GitHubCallBack from './components/GitHubCallBack';
import FAQPage from './pages/FAQPage';
import MainPage from './pages/MainPage';
import AddMigrationsPage from './pages/AddMigrationsPage';
import UpdateMigrationsPage from './pages/UpdateMigrationsPage';
import ProjectsPage from './pages/ProjectsPage';
import logo from './assets/logo.png';

const App: React.FC = () => {
	return (
		<Router>
			<NavBar logo={logo} />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/updateMigrations" element={<UpdateMigrationsPage />} />
				<Route path="/githubs/callbacks" element={<GitHubCallBack />} />
				<Route path="/addMigrations" element={<AddMigrationsPage />} />
				<Route path="/migration" element={<MigrationPage />} />
				<Route path="/projects" element={<ProjectsPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/faq" element={<FAQPage />} />
			</Routes>
		</Router>
	);
};

export default App;
