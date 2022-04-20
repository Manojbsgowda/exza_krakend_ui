import React from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import DynamicPages from "./DynamicPages";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout_container">
      <Navbar />
      <div className="side_dynamic_container">
        <Sidebar />
        <DynamicPages />
      </div>
    </div>
  );
};

export default Layout;
