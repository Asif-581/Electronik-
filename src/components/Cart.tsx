import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../Store/hooks";
import Navigation from "../components/Navigation";
import { Box, Button } from "@mui/material";

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
import { fetchUserDetails } from "../features/product/authSlice";

const Cart = () => {
  const { cart, status } = useAppSelector((store) => store.cart);
  const { isAuthenticated,user } = useAppSelector((store) => store.auth);
 
  const dispatch = useAppDispatch();
 const userId = user?.user_id

  const getCartItems = async (userId: string) => {
    await dispatch(getCartItemAsync(userId));
  };

  useEffect(() => {
    getCartItems(user?.user_id!);
    dispatch(fetchUserDetails());
  }, [userId]);



  if (status === STATUS.LOADING) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
     
      >
        <Loading />
      </Box>
    );
  }
  if (cart?.length === 0 ) return <EmptyCart />;

  return (
    <>
      {/* {cart?.length != 0 && <Navigation title="cart" />} */}
      <Navigation title="cart" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "30px",
          width: "100%",
          minHeight: "100vh",
          // overflow: "hidden",
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
            {/* {isAuthenticated ? (
              <Modal />
            ) : (
              <Link to="/login">
                <Button variant="contained" color="success" disableRipple>
                  Login
                </Button>
              </Link>
            )} */}

            {isAuthenticated === false ? (
              <Link to="/login">
                <Button variant="contained" color="success" disableRipple>
                  Login
                </Button>
              </Link>
            ) : (
              <>
                {/* <Button variant="contained" color="success" disableRipple>
                  Place order
                </Button> */}
                <Modal />
              </>
            )}

            <Button
              variant="contained"
              disableRipple
              onClick={async () => {
                await dispatch(clearAllCartItems(user?.user_id!));
                dispatch(getCartItemAsync(userId!));
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

export default Cart;





