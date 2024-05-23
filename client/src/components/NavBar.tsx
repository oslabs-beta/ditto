import React, { useEffect } from 'react'; // imports al;l exports from reacct pkg and bundles them as React
import { Link, useNavigate } from 'react-router-dom'; // Link used to navigate btwn routes w/in app without page refresh
import '../styles/NavBar.css';
interface NavLink {
	// describes sha[pe of objects where each object has path and label type of string]
	path: string;
	label: string;
}

interface NavBarProps {
	logo?: string;
	links?: NavLink[];
}


const NavBar: React.FC<NavBarProps> = ({ logo }) => {
	const navigate = useNavigate();
	const navLinks: NavLink[] = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
		{ path: '/login', label: 'Login' },
		{ path: '/signup', label: 'Signup' },
	];

	if (sessionStorage.getItem('token')) {
		navLinks.push({ path: '/migration', label: 'Migration' });
	}

	function handleLogOut() {
		sessionStorage.clear();
		navigate('/login');
	}
	const isLoggedIn = Boolean(sessionStorage.getItem('token'));

	console.log(navLinks);
	return (
		<nav>
			<ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
				{logo && (
					<li>
						<img src={logo} alt="Logo" style={{ height: '50px' }} />
					</li>
				)}
				{navLinks.map((link, index) => (
					<li key={index} style={{ marginLeft: '20px' }}>
						<Link to={link.path}>{link.label}</Link>
					</li>
				))}
				<li style={{ marginLeft: 'auto' }}></li>
				{isLoggedIn && (
					<button className="logOut" onClick={handleLogOut}>
						Log Out
					</button>
				)}
			</ul>
			{}
		</nav>
	);
};

export default NavBar;
