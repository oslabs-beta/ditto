import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

interface NavLink {
    path: string;
    label: string;
}

interface NavBarProps {
    logo?: string;
    links: NavLink[]; // Make links a required prop
}

const NavBar: React.FC<NavBarProps> = ({ logo, links }) => {
    const navigate = useNavigate();

    const navLinks = links.slice(); // Use the passed links prop

    if (sessionStorage.getItem('token')) {
        navLinks.push({ path: '/migration', label: 'Migration' });
    }

    function handleLogOut() {
        sessionStorage.clear();
        navigate('/login');
    }

    const isLoggedIn = Boolean(sessionStorage.getItem('token'));

    return (
        <nav>
            <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
                {logo && (
                    <li>
                        <Link to="/">
                            <button style={{ border: 'none', background: 'none', padding: 0 }}>
                                <img src={logo} alt="Logo" style={{ height: '50px' }} />
                            </button>
                        </Link>
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
        </nav>
    );
};

export default NavBar;
