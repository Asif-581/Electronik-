import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../Store/hooks";

const EmptyCart = () => {
  const { darkMode } = useAppSelector((store) => store.theme);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        bgcolor: `${darkMode ? "black" : "white"}`,
        color: `${darkMode ? "white" : "black"}`,
      }}
    >
      <Box sx={{ width: "300px", height: "300px" }}>
        <img
          src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?size=626&ext=jpg&ga=GA1.1.125147218.1701183125&semt=ais"
          alt="empty cart"
          width="100%"
          height="100%"
        />
      </Box>
      {}
      <Typography variant="h5">Your cart is empty!</Typography>
      <Typography variant="subtitle1">Add items to it now.</Typography>
      <Link to="/products">
        <Button variant="contained" size="large" disableRipple={true}>
          Shop now
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
