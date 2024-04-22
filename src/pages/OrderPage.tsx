import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { getOrderItem } from "../features/product/orderSlice";
import { formatPrice } from "../utils/helper";
import { STATUS } from "../constants/Status";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);
  const { orderDetails, status } = useAppSelector((store) => store.orders);

  useEffect(() => {
    if (user) {
      dispatch(getOrderItem(user.user_id!));
    }
  }, [user]);

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

  return (
    <>
      <Navigation title="My Orders" />
      {orderDetails?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            width: "600px",

            borderRadius: "8px",
          }}
        >
          <Typography variant="h4">No orders yet...</Typography>
          <Link to="/products">
            <Button variant="contained" disableElevation>
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

            borderRadius: "8px",
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
                    borderRadius: "8px",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                         
                        }}
                      > */}

                      <Box>
                        <Typography variant="h6">
                          Order ID: #{order.payment_id}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="h6">
                          Order Status :{" "}
                          <Chip label={order.status} color="success" />
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6">
                          Placed on: {formattedDate}
                        </Typography>
                      </Box>
                      {/* </Box> */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography variant="h6">
                          {" "}
                          Order total :{formatPrice(order.orderTotal)}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    {orderItem?.map((item) => (
                      <Box
                        key={item.products.name}
                        sx={{
                          display: "flex",
                          gap: "100px",
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
                        <Box sx={{ width: "100%" }}>
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
                            {formatPrice(item?.totalItemPrice)}
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
