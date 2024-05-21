// App.tsx (or any other component where you want to use the NavBarComponent)

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route as Route } from 'react-router-dom';
import { Routes as Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import favicon from '/client/src/public/favicon.ico';
import logoImage from './assets/logo.png';
import MigrationPage from './pages/MigrationPage';
import SignUpPage from './pages/SignUpPage';
// import UsersList from './pages/UsersList';
import GitHubCallBack from './components/GitHubCallBack';
// import GitHubLogin from './components/GitHubLogin';
import DocumentationPage from './pages/DocumentationPage';
import CommunityPage from './pages/CommunityPage';
import FAQPage from './pages/FAQPage';
import MainPage from './pages/MainPage';
import LogOut from './components/LogOutButton';
import UserBubble from './components/UserBubble'; // Might be good to implement for user/guest?

const App: React.FC = () => {
	const navLinks = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
		{ path: '/migration', label: 'Migration' },
		{ path: '/login', label: 'Login' },
		{ path: '/signup', label: 'Signup' },
		{ path: '/logout', label: 'Log Out'}
	];

	return (
		<Router>
			<div>
				<NavBar links={navLinks} logo={logoImage} />
				{/* <UsersList /> */}
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					{/* <Route path="/github/login" element={<GitHubLogin />} /> */}
					<Route path="/github/callback" element={<GitHubCallBack />} />
					<Route path="/migration" element={<MigrationPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/documentation" element={<DocumentationPage />} />
					<Route path="/community" element={<CommunityPage />} />
					<Route path="/faq" element={<FAQPage />} />
					<Route path="/logout" element={<LogOut />} />
					{/* Define more routes as necessary */}
				</Routes>
			</div>
		</Router>
	);
};

export default App;
