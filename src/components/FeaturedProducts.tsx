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
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, []);

  if (status !== STATUS.LOADING && status === STATUS.ERROR) {
    return <h2>{status}</h2>;
  }

  return (
    <>
      <Box paddingY="50px">
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          marginBottom="10px"
        >
          Featured Products
        </Typography>
        <Box
          marginX="auto"
          marginBottom="40px"
          bgcolor="#e53935"
          height="0.25rem"
          width="6rem"
          borderRadius="10px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingX: { xs: "20px", md: "50px" },
            paddingTop: "50px",
          }}
        >
          <Grid container spacing={4}>
            {status === STATUS.LOADING ? (
              <>
                {featuredProducts?.map((_, index) => (
                  //@ts-ignore
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      sx={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        maxWidth: "350px", // Change this value to make the card smaller
                        maxHeight: "450px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Skeleton variant="rectangular" height={250} />
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
                featuredProducts?.map((product: productType) => (
                //@ts-ignore
                <Grid item xs={12} md={4} key={product?.id}>
                  <Card
                    sx={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",

                      maxWidth: "400px",
                      maxHeight: "500px",
                      marginBottom: "20px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <CardActionArea>
                      <Link to={`/products/${product?.id}`}>
                        <CardMedia
                          component="img"
                          sx={{
                            height: { xs: "200px", md: "200px" },
                            border: { xs: "2px solid #e53935", sm: "none" },
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                          image={product.image}
                          alt={product.name}
                        />
                      </Link>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          cursor: "default",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          textAlign="center"
                          fontWeight="bold"
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight="bold"
                        >
                          {formatPrice(product.price!)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                          marginTop="10px"
                        >
                          {product.description?.slice(0, 120)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default FeaturedProducts;








