import React from "react";
import Cart from './../components/Cart'
import IsAuthenticated from "../components/IsAuthenticated";
import { useAppSelector} from "../Store/hooks";
import { Box } from "@mui/material";
const CartPage = () => {
  const { isAuthenticated } = useAppSelector((store) => store.auth);
  return (
    <>
      <Box sx={{height:'100vh'}}>{isAuthenticated ? <Cart /> : <IsAuthenticated />}</Box>
  
    </>
  );
};

export default CartPage;
