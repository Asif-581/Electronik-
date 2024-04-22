import React from "react";
import { Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { getAllProducts } from "../features/product/ProductSlice";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helper";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/product/SingleProductSlice";
import { Product, productType } from "../Types/type";
import { STATUS } from "../constants/Status";


import { useLocation } from "react-router-dom";
import NoDataFound from "./NoDataFound";
const GridView = () => {
  const { products, status } = useAppSelector((store) => store.products);
  const { filteredProducts } = useAppSelector((store) => store.filterProducts);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(getAllProducts(searchParams));
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);


  return (
    <Box sx={{ width: "100%", marginY: "32px" }}>
      {products.length != 0 ?
        <Grid container rowSpacing={4} columnSpacing={4}>
          {products.map((product: Product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Link to={`${product.id}`}>
                  <div style={{ height: "175px", position: "relative" }}>
                    {status === STATUS.LOADING ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="175px"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px 8px 0 0",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </Link>
                <CardContent sx={{ padding: "16px" }}>
                  {status === STATUS.LOADING ? (
                    <Skeleton
                      width="100%"
                      height="24px"
                    
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      fontSize="18px"
                      fontWeight="bold"
                      sx={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {product?.name}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    fontSize="16px"
                 
                    sx={{
                      maxHeight: "3rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {status === STATUS.LOADING ? (
                      <Skeleton
                        width="80%"
                        height="16px"
                      
                      />
                    ) : (
                      product.description // Assuming product.description exists
                    )}
                  </Typography>
                  {status === STATUS.LOADING ? (
                    <Skeleton
                      width="50%"
                      height="24px"
                   
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      fontSize="18px"
                      fontWeight="bold"
                      sx={{ color: "success.main", mt: 1 }}
                    >
                      {formatPrice(product?.price!)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> :
        <NoDataFound/>
        }
    </Box>
  );
};

export default GridView;
