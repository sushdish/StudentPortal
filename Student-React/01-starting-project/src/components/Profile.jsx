import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InboxIcon from "@mui/icons-material/Inbox";
import Navigation from "./Navigation";

import { useLocation } from "react-router-dom";

export default function Profile() {
  const userName = localStorage.getItem("userName");

  return (
    <>
      <Navigation />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Welcome, {userName}
        </Typography>
      </Box>
    </>
  );
}

Profile.propTypes = {
  window: PropTypes.func,
};
