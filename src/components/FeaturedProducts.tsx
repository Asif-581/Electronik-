import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { STATUS } from "../constants/Status";
import Loading from "./Loading";
import { formatPrice } from "../utils/helper";
import { getFeaturedProducts } from "../features/product/featuredProductsSlice";
import React from "react";
import { productType } from "./../Types/type";
import Skeleton from "@mui/material/Skeleton";

const FeaturedProducts = () => {
  const { featuredProducts, status } = useAppSelector(
    (store) => store.featuredProducts
  );
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, []);

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  return (
    <>
      <Box
        paddingY="80px"
        bgcolor={`${darkMode ? "#040D12" : "aliceblue"}`}
        color={`${darkMode ? "white" : "black"}`}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Featured Products
        </Typography>
        <Box
          marginX="auto"
          marginTop="5px"
          bgcolor="red"
          height="0.25rem"
          width="6rem"
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            paddingX: { xs: "20px", md: "100px" },
            paddingTop: "50px",
            bgcolor: `${darkMode ? "#040D12" : "aliceblue"}`,
          }}
        >
          <Grid
            container
            columnSpacing={4}
            rowSpacing={{ xs: 3 }}
            sx={{ width: "1200px" }}
          >
            {status === STATUS.LOADING ? (
              <>
                {featuredProducts?.map((_, index) => (
                  <Grid xs={12} md={4} key={index}>
                    <Card sx={{ boxShadow: "none", bgcolor: "aliceblue" }}>
                      <Skeleton
                        variant="rectangular"
                        height={250}
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          cursor: "default",
                        }}
                      >
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="text" width={50} height={20} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </>
            ) : (
              featuredProducts?.map((product: productType) => {
                return (
                  <Grid xs={12} md={4} key={product?.id}>
                    <Card sx={{ boxShadow: "none", bgcolor: "aliceblue" }}>
                      <CardActionArea>
                        <Link to={`/products/${product?.id}`}>
                          <CardMedia
                            component="img"
                            sx={{
                              height: { xs: "200px", md: "250px" },

                              border: { xs: "2px solid red", sm: "none" },
                            }}
                            image={product.image}
                            alt="green iguana"
                          />
                        </Link>
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            cursor: "default",
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            fontSize="1rem"
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatPrice(product.price!)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="2.5rem">
          <Link to="/products">
            <Button variant="contained" color="success">
              All Products
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default FeaturedProducts;
