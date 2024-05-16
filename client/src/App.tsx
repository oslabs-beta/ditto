// App.tsx (or any other component where you want to use the NavBarComponent)

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBarComponent from './components/NavBar';

const App: React.FC = () => {
	const navLinks = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
	];

	return (
		<Router>
			<div>
				<NavBarComponent
					links={navLinks}
					logo="./assets/osp-ditto-circle.png"
				/>
			</div>
		</Router>
	);
};

export default App;
