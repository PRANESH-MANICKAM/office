import React from 'react';
import "./header.scss";

interface IHeaderProps {
  children?: React.ReactNode | undefined;
}

const Header: React.FC<IHeaderProps> = ({ children = undefined }) => {
  return (
    <header className="app-header">
      {children}
    </header>
  );
};

export default Header;
