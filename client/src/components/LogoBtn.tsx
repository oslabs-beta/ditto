// implement this when it'll behave

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.webp';
import '../styles/components/LogoBtn.css';

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
