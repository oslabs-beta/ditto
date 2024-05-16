// NavBarComponent.tsx
import * as React from 'react'; // imports al;l exports from reacct pkg and bundles them as React
import * as ReactDOM from 'react-dom'; // same but for React-Dom
import { Link } from 'react-router-dom'; // Link used to navigate btwn routes w/in app without page refresh

interface NavLink {
	// describes sha[pe of objects where each object has path and label type of string]
	path: string;
	label: string;
}

interface NavBarProps {
	// expects a link array and a logo string
	links: NavLink[];
	logo?: string; // Optional logo prop
}

const NavBar: React.FC<NavBarProps> = ({ links, logo }) => {
	// declaring NavBar component and takes in NavBarProps
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
				<li style={{ marginLeft: 'auto' }}>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button style={{ padding: '10px 20px', cursor: 'pointer' }}>
							Login
						</button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
