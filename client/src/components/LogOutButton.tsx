import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../store';
import '../styles/components/LogOutButton.css';

const LogOut: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(resetState());
		sessionStorage.clear();
		navigate('/login');
	};

	return (
		<button className="logOut" onClick={handleLogout}>
			Log Out
		</button>
	);
};

export default LogOut;
