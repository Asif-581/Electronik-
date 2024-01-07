import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../Store/hooks";
import Navigation from "../components/Navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { formatPrice, getCurrentLoggedInUser } from "../utils/helper";

import {
  clearAllCartItems,
  getCartItemAsync,
} from "../features/product/CartSlice";
import { STATUS } from "../constants/Status";
import Loading from "../components/Loading";
import PriceDetails from "../components/PriceDetails";
import { Link } from "react-router-dom";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import Modal from "./Modal";

const CartPage = () => {
  const { cart, status } = useAppSelector((store) => store.cart);
  const { isAuthenticated } = useAppSelector((store) => store.auth);
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const user = getCurrentLoggedInUser();

  const getCartItems = async (userId: string) => {
    await dispatch(getCartItemAsync(userId));
  };

  useEffect(() => {
    getCartItems(user?.id);
  }, []);

  if (status === STATUS.LOADING) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={darkMode ? "black" : "white"}
      >
        <Loading />
      </Box>
    );
  }
  if (cart?.length === 0 || isAuthenticated === false) return <EmptyCart />;

  return (
    <>
      {cart?.length != 0 && <Navigation title="cart" />}
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          bgcolor: `${darkMode ? "black" : "white"}`,
          color: `${darkMode ? "white" : "black"}`,
        }}
      >
        
        <CartList />
        <Box
          sx={{
            marginTop: "50px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PriceDetails />
          <Box sx={{ marginY: "50px", display: "flex", gap: "50px" }}>
            {isAuthenticated ? (
              <Modal />
            ) : (
              <Link to="/login">
                <Button variant="contained" color="success" disableRipple>
                  Login
                </Button>
              </Link>
            )}

            <Button
              variant="contained"
              disableRipple
              onClick={async () => {
                await dispatch(clearAllCartItems(user.id));
                dispatch(getCartItemAsync(user.id));
              }}
            >
              Clear cart
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartPage;
