import { Button } from "@mui/material";
import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <nav className="home_navbar">
        <div className="api_count">
          <b>APIs</b>
          <b>Total : 2 APIs</b>
        </div>
        <div>
          <Button component={Link} variant="contained" to="/create_api">
            create APIs
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Home;
