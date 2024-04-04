// Layout.jsx
import React from "react";
import Sidebar_ from "../../components/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar_ />
      <div style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
