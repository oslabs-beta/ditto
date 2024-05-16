// App.tsx (or any other component where you want to use the NavBarComponent)

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route as Route } from 'react-router-dom';
import { Routes as Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import logoImage from './assets/osp-ditto-circle.png'; // imports logo img, can be used with react components

const App: React.FC = () => {
	const navLinks = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
	];

	return (
		<Router>
			<div>
				<NavBar links={navLinks} logo={logoImage} />
				<LoginPage />
			</div>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				{/* Add other routes here if necessary */}
			</Routes>
		</Router>
	);
};

export default App;
