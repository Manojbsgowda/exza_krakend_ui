import React, { useState } from "react";
import { optionData } from "../../dummyData";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import {
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { toggleDrawer } from "../../redux/toggleDrawer/toggleDrawerSlice";
const Navbar = () => {
  const [options, setOptions] = useState([]);
  const [toggleSidebar, settoggleSidebar] = useState(false);

  const dispatch = useDispatch();

  const searchDataHandler = (e) => {
    setOptions(
      optionData.filter((val) =>
        val.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    if (e.target.value === "") {
      setOptions([]);
    }
    console.log(options);
  };

  const handleSidebar = () => {
    settoggleSidebar(!toggleSidebar);
    dispatch(toggleDrawer(toggleSidebar));
  };

  const handleSearchResult = () => {
    setOptions([]);
  };
  return (
    <>
      <div className="navbar_container">
        <div className="left_navbar_container">
          <div className="logo">Exza</div>

          <div className="api_container">
            <div className="api_button" onClick={handleSidebar}>
              <MenuIcon />
            </div>
          </div>
        </div>

        <div className="center_navbar_container">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              position: "relative",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search API's"
              onChange={searchDataHandler}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Paper sx={{ position: "absolute", width: 407, marginTop: 2 }}>
            {options?.map((value, index) => {
              return (
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleSearchResult}>
                      <ListItemText primary={value.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
              );
            })}
          </Paper>
        </div>
        <div className="right_navbar_container">
          <div className="admin_container">
            {/* <IconButton aria-label="delete">
              
            </IconButton> */}
            <button className="admin_button">
              <PersonIcon style={{ marginRight: "5px" }} />
              <p style={{ fontSize: "14px", marginRight: "5px" }}>Admin</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
