import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Drawer, IconButton, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "./../Store/hooks";
import { signOutAsync } from "../features/product/authSlice";
import { Button, useMediaQuery } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { toggleDarkMode } from "../features/product/themeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const links = [
  {
    id: 1,
    text: "Home",
    url: "/",
  },
  {
    id: 2,
    text: "About",
    url: "/about",
  },
  {
    id: 3,
    text: "Products",
    url: "/products",
  },
  {
    id: 4,
    text: "Order",
    url: "/order",
  },
  {
    id: 5,
    text: "Admin",
    url: "/admin",
  },
];




const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((store) => store.auth);
  const { cart } = useAppSelector((store) => store.cart);
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const isLaptop = useMediaQuery("(min-width:961px) and (max-width:1366px)");
  const isDesktop = useMediaQuery("(min-width:1367px)"); // Adjust as needed
  const is32InchDesktop = useMediaQuery("(min-width:2560px)"); // Adjust as needed

  const handleLogout = async () => {
    try {
      await dispatch(signOutAsync());
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: `${darkMode ? "#040D12" : "white"}`,
          boxShadow: "none",
        }}
      >
        <Toolbar
          // sx={{
          //   display: "flex",
          //   gap: "20px",
          //   justifyContent: { xs: "flex-end", md: "space-around" },
          // }}

          sx={{
            display: "flex",

            alignItems: "center",

            justifyContent: isMobile
              ? "space-between"
              : { xs: "flex-end", md: "space-around" },
          }}
        >
          {isMobile ? null : (
            <Link to="/">
              <Box sx={{ width: { xs: "150px", md: "200px" } }}>
                <img src={logo} alt="logo" width="100%" />
              </Box>
            </Link>
          )}

          {isMobile && (
            <>
              <IconButton
                edge="start"
                color={`${darkMode ? "error" : "black"}`}
                aria-label="menu"
                sx={{ mr: 2 }}
                size="large"
                onClick={handleDrawerToggle}
              >
                <MenuIcon/>
              </IconButton>

              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <Box sx={{ width: { xs: "150px", md: "200px" } }}>
                    <img src={logo} alt="logo" width="100%" />
                  </Box>
                  {links.map(({ id, url, text }) => (
                    <NavLink
                      to={`${url}`}
                      key={id}
                      style={({ isActive }) => ({
                        color: isActive ? "blue" : "darkred",
                        textDecoration: "none",
                        padding: "10px",
                        fontSize: "18px",
                        display: "block",
                        my: 2,
                      })}
                    >
                      {text}
                    </NavLink>
                  ))}
                </Box>
              </Drawer>
            </>
          )}

          {(isTablet || isDesktop || isLaptop || is32InchDesktop) && (
            <Box sx={{ display: "flex", gap: "50px" }}>
              {links.map(({ id, url, text }) => (
                <NavLink
                  to={`${url}`}
                  key={id}
                  style={({ isActive }) => ({
                    color: isActive ? "blue" : "darkred",
                    textDecoration: "none",
                    paddingBottom: "3px",
                    fontSize: "20px",
                    display: "block",
                    my: 2,
                  })}
                >
                  {text}
                </NavLink>
              ))}
            </Box>
          )}

          <Box
            display="flex"
            sx={{
              justifyContent: isMobile ? "flex-end" : "flex-end",
              width: isMobile
                ? "100%"
                : isTablet
                ? "50%"
                : isLaptop
                ? "40%"
                : "30%",
              alignItems: "center",
              gap: isMobile ? "30px" : "15px",
            }}
            gap={{ xs: "30px" }}
          >
            <Box
              display="flex"
              color={`${darkMode ? "white" : "black"}`}
              alignItems="center"
              justifyContent="center"
              gap="15px"
            >
              <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                Cart
              </Typography>
              <Link to="/cart">
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon
                    sx={{ fontSize: { xs: "25px", sm: "35px" } }}
                  />
                </Badge>
              </Link>
            </Box>

            <Box
              display="flex"
              color="black"
              alignItems="center"
              justifyContent="center"
              gap="15px"
            >
              {isAuthenticated === true ? (
                <>
                  {isMobile ? null : (
                    <Chip
                      avatar={
                        <Avatar>{userName?.slice(0, 1).toUpperCase()}</Avatar>
                      }
                      label={userName}
                      sx={{ color: `${darkMode ? "white" : "black"}` }}
                    />
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    style={{ boxShadow: "none" }}
                    onClick={handleLogout}
                    size="small"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ boxShadow: "none" }}
                      size="small"
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </Box>
            <div
              style={{ padding: "0px", cursor: "pointer" }}
              onClick={handleToggleDarkMode}
            >
              {darkMode ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon sx={{ color: "black" }} />
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
