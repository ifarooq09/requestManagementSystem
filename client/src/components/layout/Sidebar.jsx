/* eslint-disable no-unused-vars */
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarItems from "../layout/SidebarItems";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { apiService } from "../services/apiService.js";
import { LOGOUT_ROUTE, VALID_USER_INFO } from "../services/constants.js";

// Define drawer width
const drawerWidth = 240;

// Customize AppBar styles
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

// Drawer header style
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  justifyContent: "flex-start",
  height: "64px",
  backgroundColor: "#2e7d32"
}));

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Set the primary color to #2e7d32
    },
  },
});

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState({});
  const history = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // // Toggle drawer state
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  // Handle avatar click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
    history("/profile");
  };

  // Validate dashboard
  const dashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const response = await apiService.get(VALID_USER_INFO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 401 || !response) {
      history("*");
    } else {
      setLoginData(response.data);
    }
  };

  // Effect hook to validate dashboard on mount
  useEffect(() => {
    dashboardValid();
  }, []);

  // Handle logout
  const logOut = async () => {
    let token = localStorage.getItem("usersdatatoken");

    try {
      const response = await apiService.get(LOGOUT_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("usersdatatoken");
        setLoginData(false);
        history("/");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer}
              sx={{ order: 3 }}
            >
              <MenuIcon />
            </IconButton> */}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ textAlign: "center", flexGrow: 1, order: 2, fontSize: 30 }}
            >
              سیستم ثبت پیشنهاد و حکم مقام
            </Typography>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                backgroundColor: "#ffffff",
                fontWeight: "bold",
                color: "#000000",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              {loginData?.validUserOne?.firstName?.charAt(0).toUpperCase() +
                "" +
                loginData?.validUserOne?.lastName?.charAt(0).toUpperCase()}
            </Avatar>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="permanent"
          anchor="right"
          open={open}
          dir="rtl"
        >
          <DrawerHeader>
            {/* <IconButton onClick={toggleDrawer}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton> */}
          </DrawerHeader>
          <Divider />
          <List component="nav">
            <SidebarItems />
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
