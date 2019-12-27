import React from "react";

import "./style.scss";

interface SidebarProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Sidebar: React.FC<React.PropsWithChildren<SidebarProps>> = props => {
  const { children } = props;
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
