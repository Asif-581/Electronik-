import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { getAllProducts } from "../features/product/ProductSlice";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helper";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/product/SingleProductSlice";
import Loading from "./Loading"
import { productType } from "../Types/type";
import { STATUS } from "../constants/Status";
const GridView = ({ darkMode }: { darkMode: boolean | undefined }) => {
  const { products, status } = useAppSelector((store) => store.products);
  const { filteredProducts } = useAppSelector((store) => store.filterProducts);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProducts(""));
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ width: "100%", marginY: "32px" }}>
      <Grid container rowSpacing={4} columnSpacing={5}>
        {(filteredProducts.length === 0 ? products : filteredProducts).map(
          (product: productType) => (
            <Grid item key={product.id} xs={12} md={4} lg={4}>
              <Box width="100%">
                <Link to={`${product.id}`}>
                  <Box sx={{ width: "100%", height: "175px" }}>
                    {status === STATUS.LOADING ? (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="175px"
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt="image"
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "5px", objectFit: "cover" }}
                      />
                    )}
                  </Box>
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 2,
                  }}
                >
                  {status === STATUS.LOADING ? (
                    <Skeleton
                      width="100%"
                      height="40px"
                      sx={{
                        bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                      }}
                    />
                  ) : (
                    <>
                      <Typography variant="h6" fontSize="18px">
                        {product?.name}
                      </Typography>
                      <Typography variant="h6" fontSize="18px">
                        {formatPrice(product?.price!)}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default GridView;
