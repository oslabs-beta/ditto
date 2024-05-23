// NavBar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string | React.ComponentType;
}

interface NavBarProps {
  links: NavLink[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {typeof link.label === 'string' ? (
              <Link to={link.path}>{link.label}</Link>
            ) : (
              <link.label /> // This assumes label can be a component, such as LogoBtn
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
