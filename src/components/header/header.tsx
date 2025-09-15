import React from 'react';
import "./header.scss";

interface IHeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
