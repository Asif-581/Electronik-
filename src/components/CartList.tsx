import React, { useEffect } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AmountButton from "../components/AmountButton";
import {
  getCartItemAsync,
  removeCartItemAsync,
} from "../features/product/CartSlice";
import { Box, Button,Skeleton,Typography } from '@mui/material';
import { formatPrice, getCurrentLoggedInUser } from '../utils/helper';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { Link } from 'react-router-dom';
import { STATUS } from '../constants/Status';
const CartList = () => {
  const { cart, status } = useAppSelector((store) => store.cart);
  const { darkMode } = useAppSelector((store) => store.theme);
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [CartId, setCartId] = React.useState("");
    const user = getCurrentLoggedInUser();


  
      const handleClickOpen = (cartId) => {
        setCartId(cartId);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

  return (
    <>
      
      <Box
        sx={{
          marginTop: "50px",
          marginX: "150px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "700px",
        }}
      >
        
        {Array.isArray(cart) &&
          cart?.map((cartItem, index) => {
            const { quantity, products, id, product_id, color } = cartItem;

            return (
              <>
               
                  <Box key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        gap: "40px",
                        bgcolor: `${darkMode ? "black" : "white"}`,
                        color: `${darkMode ? "white" : "black"}`,
                      }}
                    >
                      <Link to={`/products/${product_id}`}>
                        <CardMedia
                          component="img"
                          sx={{ width: 151, height: 150 }}
                          image={products?.image}
                          alt={products?.name}
                        />
                      </Link>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ padding: "6px" }}>
                          <Typography component="div" variant="h6">
                            {products?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: `${darkMode ? "white" : "black"}` }}
                          >
                            <span>Color</span> : {color}
                          </Typography>
                          <Typography>
                            {formatPrice(products?.price)}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{ display: "flex", gap: "20px", marginX: "5px" }}
                        >
                          <AmountButton cartId={id} product_id={product_id} />
                          <Button
                            disableRipple={true}
                            onClick={() => handleClickOpen(id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      BackdropProps={{
                        style: {
                          backgroundColor: "rgba(0.9, 0.9, 0.9, 0.2)", // Adjust opacity and color
                        },
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Remove item"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to remove this item?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="outlined"
                          disableRipple={true}
                          onClick={handleClose}
                        >
                          CANCEL
                        </Button>
                        <Button
                          disableRipple={true}
                          variant="contained"
                          sx={{ boxShadow: "none" }}
                          onClick={async () => {
                            await dispatch(removeCartItemAsync(CartId));
                            dispatch(getCartItemAsync(user.id));
                            handleClose();
                          }}
                        >
                          REMOVE
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                
              </>
            );
          })}
      </Box>
    </>
  );
}

export default CartList