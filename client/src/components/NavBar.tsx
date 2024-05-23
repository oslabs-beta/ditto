import React, { useEffect } from 'react'; // imports al;l exports from reacct pkg and bundles them as React
import { Link, useNavigate } from 'react-router-dom'; // Link used to navigate btwn routes w/in app without page refresh
import UserBubble from './UserBubble'; // Might be good to implement for user/guest?
interface NavLink {
	// describes sha[pe of objects where each object has path and label type of string]
	path: string;
	label: string;
}

interface NavBarProps {
	logo?: string; // Optional logo prop
}

const NavBar: React.FC<NavBarProps> = ({ logo }) => {
	const navigate = useNavigate();
	const navLinks: NavLink[] = [
		{ path: '/documentation', label: 'Documentation' },
		{ path: '/faq', label: 'FAQ' },
		{ path: '/community', label: 'Community' },
		{ path: '/login', label: 'Login' },
	];

	if (sessionStorage.getItem('token')) {
		navLinks.pop();
		navLinks.push({ path: '/migration', label: 'Migration' });
	}

	function handleLogOut() {
		sessionStorage.clear();
		navigate('/login');
	}

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
				<button className="logOut" onClick={handleLogOut}>
					Log Out
				</button>
			</ul>
			<UserBubble />
		</nav>
	);
};

export default NavBar;
