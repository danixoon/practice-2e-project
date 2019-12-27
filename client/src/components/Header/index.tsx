import React from "react";

import "./style.scss";

interface HeaderProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement> {}

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = props => {
  const { children, ...rest } = props;
  return (
    <header {...rest} className="header">
      {children}
    </header>
  );
};

export default Header;
