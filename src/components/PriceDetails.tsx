import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { formatPrice} from "../utils/helper";
import { calculateTotalPrice, calculateTotalQuantity } from "../features/product/CartSlice";
import { STATUS } from "../constants/Status";





export default function PriceDetails() {
  const { cart,status, itemQuantity, totalPrice } = useAppSelector((state) => state.cart);
    const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  
  
  React.useEffect(() => {
    dispatch(calculateTotalQuantity());
    dispatch(calculateTotalPrice());
  }, [itemQuantity]);
  
  
  const card = (
    <React.Fragment>
    
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            position: "sticky",
            top: "40px",
            padding: "1rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            bgcolor: `${darkMode ? "black" : "white"}`,
            color: `${darkMode ? "white" : "black"}`,
          }}
        >
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            Products Details
          </Typography>
          <Divider />
          <Typography sx={{ mt: 1.5 }}>
            Price ( {itemQuantity} items ) : {formatPrice(totalPrice)}
          </Typography>
          <Typography sx={{ mt: 1.5 }}>Discount : -₹1500</Typography>
          <Divider />
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }} gutterBottom>
            Total Amount : {formatPrice(totalPrice)}
          </Typography>
          <Divider />
          <Typography sx={{ fontSize: 15 }} gutterBottom>
            you will save 1500 on this order
          </Typography>
        </CardContent>
      
    </React.Fragment>
  );
  

  
  
  
  return (
    <Box sx={{ minWidth: 275, position: "sticky", top: '40px' }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
