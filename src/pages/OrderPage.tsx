// import React, { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../Store/hooks'
// import { getOrderItem } from '../features/product/orderSlice';
// import { formatPrice, getCurrentLoggedInUser } from '../utils/helper';
// import { STATUS } from '../constants/Status';
// import { Box, Button, Card, CardContent, CardMedia } from '@mui/material';
// import Loading from '../components/Loading';
// import Navigation from '../components/Navigation';
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Link } from 'react-router-dom';


// const OrderPage = () => {
//     const dispatch = useAppDispatch();
//     const user = getCurrentLoggedInUser();
//     const { orderDetails, status } = useAppSelector((store) => store.orders);
//     const { darkMode } = useAppSelector((store) => store.theme);
//   console.log(orderDetails)
  
//     useEffect(() => {
//         dispatch(getOrderItem(user.id))
//     }, [])
    
// if (status === STATUS.LOADING) {
//   return (
//     <Box
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       height="100vh"
//       bgcolor={darkMode ? "#040D12" : "white"}
      
//     >
//       <Loading />
//     </Box>
//   );
// }

//     return (
//       <>
//         <Navigation title="My orders" />
//         {orderDetails.length === 0 ? (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "100px",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "100px",
//             }}
//           >
//             <Typography variant="h3">No orders yet...</Typography>
//             <Link to="/products">
//               <Button variant='contained' disableRipple>Order now</Button>
//             </Link>
//           </Box>
//         ) : (
//           <Box
//             sx={{
//                 paddingX: {xs:'10px', sm:"175px"},
//                 width: { xs:'100%',sm:"100%"},
//               height: "100vh",
//               overflowY: "auto",
//             }}
//             bgcolor={darkMode ? "#040D12" : "white"}
//             color={darkMode ? "white" : "black"}
//             paddingTop="20px"
//           >
//             {orderDetails?.map((order) => {
//               const { orderItem } = order;
//               const dateObject = new Date(order.created_at);
//               const formattedDate = dateObject.toLocaleDateString("en-US", {
//                 weekday: "long",
//                 day: "numeric",
//                 month: "short",
//               });

//               return (
//                 <Box key={order.id} sx={{ margin: "20px" }}>
//                   <Accordion
//                     sx={{
//                       bgcolor: darkMode ? "#040D12" : "white",
//                       color: darkMode ? "white" : "black",
//                     }}
//                   >
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       aria-controls="panel1a-content"
//                       id="panel1a-header"
//                     >
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection:{xs:'column',sm:'row'},
//                           width: "900px",
//                           justifyContent: "space-between",
//                           alignItems: {xs:'flex-start', sm:"center"},
//                           fontSize:{xs:'20px'}
//                         }}
//                       >
//                         <Typography variant="h6">
//                           OrderID : #{order.payment_id}
//                         </Typography>
//                         <Typography component="p">{formattedDate}</Typography>
//                         <Box>
//                           <Typography component="p">
//                             {order.address_info.fullName}
//                           </Typography>
//                           <Typography component="p">
//                             {order.address_info.address}
//                           </Typography>
//                           <Typography component="p">
//                             {order.address_info.mobileNumber}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       {orderItem?.map((item) => {
                       
//                         return (
//                           <Card
//                             sx={{
//                               display: "flex",
//                               gap: "40px",
//                               bgcolor: `${darkMode ? "black" : "white"}`,
//                               color: `${darkMode ? "white" : "black"}`,
//                               width:"800px",
//                               height: "100px",
//                               marginBottom: "20px",
//                             }}
//                             key={item.products.name}
//                           >
//                             <CardMedia
//                               component="img"
//                               sx={{ width: 100, height: 99 }}
//                               image={item.products.image}
//                               alt={item?.products?.name}
//                             />

//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: "30px",
//                               }}
//                             >
//                               <CardContent sx={{ padding: "6px" }}>
//                                 <Typography component="div" variant="h6">
//                                   {item?.products?.name}
//                                 </Typography>
//                                 <Typography
//                                   variant="subtitle1"
//                                   sx={{
//                                     color: `${darkMode ? "white" : "black"}`,
//                                   }}
//                                   component="div"
//                                 >
//                                   color : {item?.color}
//                                 </Typography>
//                                 <Typography>
//                                   {formatPrice(item?.products?.price)}
//                                 </Typography>
//                               </CardContent>
//                             </Box>
//                           </Card>
//                         );
//                       })}
//                     </AccordionDetails>
//                   </Accordion>
//                 </Box>
//               );
//             })}
//           </Box>
//         )}
//       </>
//     );
// }

// export default OrderPage


import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { getOrderItem } from "../features/product/orderSlice";
import { formatPrice, getCurrentLoggedInUser } from "../utils/helper";
import { STATUS } from "../constants/Status";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const user = getCurrentLoggedInUser();
  const { orderDetails, status } = useAppSelector((store) => store.orders);
  const { darkMode } = useAppSelector((store) => store.theme);

  useEffect(() => {
    dispatch(getOrderItem(user.id));
  }, []);

  if (status === STATUS.LOADING) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor={darkMode ? "#121212" : "#f5f5f5"}
      >
        <Loading />
      </Box>
    );
  }

  return (
    <>
      <Navigation title="My Orders" />
      {orderDetails.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: darkMode ? "#121212" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderRadius: "8px",
            boxShadow: darkMode
              ? "0 0 10px rgba(255, 255, 255, 0.1)"
              : "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4">No orders yet...</Typography>
          <Link to="/products">
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: darkMode ? "#1976D2" : "#f50057",
                color: "#fff",
                "&:hover": {
                  backgroundColor: darkMode ? "#1565C0" : "#c51162",
                },
              }}
            >
              Explore Products
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            padding: { xs: "10px", sm: "20px" },
            width: "90%",
            margin: "0 auto",
            backgroundColor: darkMode ? "#121212" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderRadius: "8px",
            boxShadow: darkMode
              ? "0 0 20px rgba(255, 255, 255, 0.1)"
              : "0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {orderDetails?.map((order) => {
            const { orderItem } = order;
            const dateObject = new Date(order.created_at);
            const formattedDate = dateObject.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            });

            return (
              <Box key={order.id} sx={{ margin: "20px" }}>
                <Card
                  sx={{
                    backgroundColor: darkMode ? "#1a1a1a" : "#fff",
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: "8px",
                    boxShadow: darkMode
                      ? "0 0 10px rgba(255, 255, 255, 0.1)"
                      : "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      Order ID: #{order.payment_id}
                    </Typography>
                    <Typography variant="body2">{formattedDate}</Typography>
                    <Divider sx={{ my: 2 }} />
                    {orderItem?.map((item) => (
                      <Box
                        key={item.products.name}
                        sx={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                          image={item.products.image}
                          alt={item?.products?.name}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {item?.products?.name}
                          </Typography>
                          <Typography variant="body2">
                            Qty : {item?.quantity}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            Color: {item?.color}
                          </Typography>
                          <Typography variant="body2">
                            {formatPrice(item?.products?.price)}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default OrderPage;


