// NavBarComponent.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

interface NavBarProps {
	links: { path: string; label: string }[];
	logo?: string; // Optional logo prop
}

const NavBarComponent: React.FC<NavBarProps> = ({ links, logo }) => {
	return (
		<nav>
			<ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
				{logo && (
					<li>
						<img src={logo} alt="Logo" style={{ height: '50px' }} />
					</li>
				)}
				{links.map((link, index) => (
					<li key={index} style={{ marginLeft: '20px' }}>
						<Link to={link.path}>{link.label}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBarComponent;
