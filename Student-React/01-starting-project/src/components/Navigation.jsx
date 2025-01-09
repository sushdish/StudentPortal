import React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const navItems = [
  { text: "Profile", icon: <InboxIcon />, path: "/profilePage" },
  { text: "Topics", icon: <InboxIcon />, path: "/topicsPage" },
  { text: "Progress", icon: <InboxIcon />, path: "/progressPage" },
  { text: "Logout", icon: <InboxIcon />, action: "logout" },
];

const Navigation = ({ handleDrawerToggle, mobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button sx={{ color: "#fff" }} component={Link} to="/">
              Dashboard
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item.action === "logout" ? (
                <Button
                  key={item.text}
                  sx={{ color: "#fff" }}
                  onClick={handleLogout}
                >
                  {item.text}
                </Button>
              ) : (
                <Button
                  key={item.text}
                  sx={{ color: "#fff" }}
                  component={Link}
                  to={item.path}
                >
                  {item.text}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Dashboard
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) =>
              item.action === "logout" ? (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{ textAlign: "center" }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      textAlign: "center",
                      color:
                        location.pathname === item.path ? "black" : "inherit",
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
