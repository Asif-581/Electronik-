import AppBar from "@mui/material/AppBar";
// @ts-ignore
import Electronik from "../assets/Electronik.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Drawer, IconButton, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./../Store/hooks";
import {
  fetchUserDetails,
  logoutUser,
  signOutAsync,
} from "../features/product/authSlice";
import { Button, useMediaQuery } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { toggleDarkMode } from "../features/product/themeSlice";
import { toast } from "react-toastify";
import { getUserCartCount } from "../features/product/CartSlice";
import { setCartCount, updateCartCount } from "../features/product/CartCountSlice";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((store) => store.auth);
  const { cart } = useAppSelector((store) => store.cart);
let { count } = useAppSelector((store) => store.cartCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const isLaptop = useMediaQuery("(min-width:961px) and (max-width:1366px)");
  const isDesktop = useMediaQuery("(min-width:1367px)"); // Adjust as needed
  const is32InchDesktop = useMediaQuery("(min-width:2560px)"); // Adjust as needed

  const links = [
    {
      id: 1,
      text: "Home",
      url: "/",
    },
    // {
    //   id: 2,
    //   text: "About",
    //   url: "/about",
    // },
    {
      id: 3,
      text: "Shop",
      url: "/products",
    },
    {
      id: 4,
      text: "Order",
      url: "/order",
    },
    {
      id: 5,
      text: "Contact",
      url: "/contact",
    },
  ];

  if (user && user.role === "admin") {
    links.push({
      id: 6,
      text: "Admin",
      url: "/admin",
    });
  }

  const handleLogout = async () => {
    const data: any = await dispatch(signOutAsync());
    if (data.success) {
      toast.success(data.message);
      dispatch(logoutUser());
      dispatch(setCartCount(0));

    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

// useEffect(() => {
//   if (user) {
//     dispatch(getUserCartCount(user.user_id!));
//   }
// }, [user]);
  
  useEffect(() => {
    // Check if user is authenticated and user data is available
    if (!user) {
      dispatch(fetchUserDetails());
      
    }
    if (user && isAuthenticated) {
       dispatch(updateCartCount(user?.user_id!));
    }
   
  
  }, [dispatch, user]);

//   const getCount = async() => {
//   const count = await dispatch(getUserCartCount(user?.user_id!));
//   console.log(count.payload.count);
// }

//   useEffect(() => {
//     getCount();
//   }, []);

console.log(count)

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,

        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          bgcolor: "whitesmoke",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile
              ? "space-between"
              : { xs: "flex-end", md: "space-around" },
            transition: "all 0.3s ease", // Add a transition for smooth animations
          }}
        >
          {isMobile ? null : (
            <Link to="/">
              <Box sx={{ width: { xs: "150px", md: "200px" } }}>
                <img
                  src={Electronik}
                  alt="logo"
                  width="100%"
                  style={{
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
            </Link>
          )}

          {isMobile && (
            <>
              <IconButton
                edge="start"
                aria-label="menu"
                sx={{
                  mr: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                size="large"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
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
                    <img src="../assets/electronik-high-resolution-logo-black.png" alt="logo" width="100%" />
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
            <Box
              sx={{
                display: "flex",
                gap: "50px",
                "& a": {
                  transition: "all 0.3s ease", // Add transition for link hover effect
                  "&:hover": {
                    transform: "scale(1.1)", // Scale up on hover
                  },
                },
              }}
            >
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
              "& .MuiSvgIcon-root": {
                transition: "all 0.3s ease", // Add transition for icon hover effect
                "&:hover": {
                  transform: "scale(1.2)", // Scale up on hover
                },
              },
            }}
            gap={{ xs: "30px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="15px"
            >
              <Link to="/cart">
                <Badge badgeContent={count} color="primary">
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
                        <Avatar>{user!.name?.slice(0, 1).toUpperCase()}</Avatar>
                      }
                      label={user?.name?.split(" ").slice(0, -1).join(" ")}
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
              style={
                {
                  padding: "0px",
                  cursor: "pointer",
                  transition: "all 0.3s ease", // Add transition for dark mode icon hover effect
                  "&:hover": {
                    transform: "scale(1.2)", // Scale up on hover
                  },
                } as React.CSSProperties
              }
              onClick={handleToggleDarkMode}
            ></div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
