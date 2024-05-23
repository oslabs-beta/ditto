import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return <button className="logOut" onClick={handleLogout}>Log Out</button>
};


export default LogOut;
