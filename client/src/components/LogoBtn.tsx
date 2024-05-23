// implement this when it'll behave

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/LogoBtn.css';

const LogoBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button onClick={handleClick}>
      <img src={Logo} alt="Logo" />
    </button>
  );
};

export default LogoBtn;