// App.tsx (or any other component where you want to use the NavBarComponent)

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route as Route } from 'react-router-dom';
import { Routes as Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './Pages/LoginPage';
import logoImage from './assets/osp-ditto-circle.png'; // imports logo img, can be used with react components
import MigrationPage from './Pages/MigrationPage';
import SignUpPage from './Pages/SignUpPage';

const App: React.FC = () => {
	const navLinks = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
		{ path: '/migration', label: 'Migration' },
		{ path: '/login', label: 'Login' },
		{ path: '/signup', label: 'SignUp' },
	];

	return (
		<Router>
			<div>
				<NavBar links={navLinks} logo={logoImage} />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/migration" element={<MigrationPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					{/* Define more routes as necessary */}
				</Routes>
			</div>
		</Router>
	);
};
export default App;
