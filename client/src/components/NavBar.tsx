import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

interface NavLink {
	path: string;
	label: string;
}

interface NavBarProps {
	logo?: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo }) => {
	const navigate = useNavigate();
	const navLinks: NavLink[] = [{ path: '/faq', label: 'FAQ' }];

	if (sessionStorage.getItem('token')) {
		navLinks.push({ path: '/migration', label: 'Migration' });
	}

	function handleLogging() {
		sessionStorage.clear();
		navigate('/login');
	}

	function handleSignUp() {
		sessionStorage.clear();
		navigate('/signup');
	}

	const isLoggedIn = Boolean(sessionStorage.getItem('token'));

	console.log(navLinks);
	return (
		<div className="navbar">
			<nav>
				<ul
					style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}
				>
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
					<li className="links" style={{ marginLeft: 'auto' }}></li>
					{isLoggedIn ? (
						<button className="logOut" onClick={handleLogging}>
							Log Out
						</button>
					) : (
						<button className="logOut" onClick={handleLogging}>
							Log In
						</button>
					)}
					<button className="signUp" onClick={handleSignUp}>
						Sign Up
					</button>
					<img src="../assets/img/github.svg" />
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
