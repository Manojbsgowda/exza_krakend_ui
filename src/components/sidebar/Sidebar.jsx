import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ApiIcon from "@mui/icons-material/Api";
import SecurityIcon from "@mui/icons-material/Security";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getIsSideBar } from "../../redux/toggleDrawer/toggleDrawerSlice";
import {
  getEndPointsFormData,
  getIsDownload,
  getServiceFormData,
} from "../../redux/formSubmit/formSubmitSlice";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const isSidebar = useSelector(getIsSideBar);

  const serviceData = useSelector(getServiceFormData);
  const endpointsData = useSelector(getEndPointsFormData);
  const isDisabled = useSelector(getIsDownload);

  const val = isSidebar ? "none" : "flex";
  const goToDashboardPage = () => {
    navigate("/");
  };
  const goToServicePage = () => {
    navigate("/services");
  };
  const goToEndpointPage = () => {
    navigate("/endpoint");
  };

  const sendData = () => {
    const { hostName, ...info1 } = serviceData;
    const { id, title1, ...info2 } = endpointsData;
    console.log(
      JSON.stringify({ ...info1, endpoints: endpointsData }, null, 2)
    );
    axios
      .post(
        "http://localhost:5000/config/create",
        JSON.stringify({ ...info1, endpoints: info2 }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const url = "http://localhost:5000/config/download";

        axios.get(url).then(() => {
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `krakend.json`);
          document.body.appendChild(link);
          link.click();
        });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const downloadConfigData = async () => {
    console.log(
      JSON.stringify({ ...serviceData, endpoints: endpointsData }, null, 2)
    );
    await sendData();
  };

  return (
    <div style={{ display: val }} className="sidebar_container">
      <List component="nav" aria-label="mailbox folders" sx={{ flex: 1 }}>
        <ListItem disablePadding onClick={goToDashboardPage}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={goToServicePage}>
          <ListItemButton>
            <ListItemIcon>
              <ApiIcon />
            </ListItemIcon>
            <ListItemText primary="Service Config" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem disablePadding onClick={goToEndpointPage}>
          <ListItemButton>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Endpoint" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MiscellaneousServicesIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Divider sx={{ marginTop: 9 }} />
        <ListItem disablePadding onClick={downloadConfigData}>
          <ListItemButton disabled={isDisabled}>
            <ListItemIcon>
              <DownloadForOfflineIcon />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default Sidebar;
