import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../store';
import '../styles/components/NavBar.css';

interface NavLink {
	path: string;
	label: string;
}

interface NavBarProps {
	logo?: string;
}

const NavBar: React.FC<NavBarProps> = ({ logo }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const navLinks: NavLink[] = [
		// { path: '/faq', label: 'FAQ' },
		{ path: '/projects', label: 'Projects' },
	];

	if (sessionStorage.getItem('token')) {
		navLinks.push({ path: '/migration', label: 'Migration' });
	}

	function handleLogging() {
		dispatch(resetState());
		sessionStorage.clear();
		navigate('/login');
	}

	const isLoggedIn = Boolean(sessionStorage.getItem('token'));

	return (
		<div className="navbar">
			<nav>
				<ul
					style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}
				>
					{logo && (
						<li>
							<img
								className="logo"
								src={logo}
								alt="Logo"
								onClick={() => navigate('/')}
							/>
						</li>
					)}
					{navLinks.map((link, index) => (
						<li key={index} style={{ marginLeft: '20px' }}>
							<Link to={link.path}>{link.label}</Link>
						</li>
					))}
				</ul>
				<div className="navbtns">
					{isLoggedIn ? (
						<button className="logOut" onClick={handleLogging}>
							Log Out
						</button>
					) : (
						<button className="logOut" onClick={handleLogging}>
							Sign In
						</button>
					)}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
