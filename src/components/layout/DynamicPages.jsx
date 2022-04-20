import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CreateApi from "../../pages/create-api/CreateApi";
import Endpoint from "../../pages/endpoint/Endpoint";
import Home from "../../pages/home/Home";
import Services from "../../pages/services/Services";
import { getIsSideBar } from "../../redux/toggleDrawer/toggleDrawerSlice";

const DynamicPages = () => {
  const isSidebar = useSelector(getIsSideBar);

  const val = isSidebar ? "99.3vw" : "calc(99.3vw - 200px)";
  return (
    <div style={{ width: val }}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/create_api" element={<CreateApi />} />
      </Routes>
      <Routes>
        <Route path="/services" element={<Services />} />
      </Routes>
      <Routes>
        <Route path="/endpoint" element={<Endpoint />} />
      </Routes>
    </div>
  );
};

export default DynamicPages;
