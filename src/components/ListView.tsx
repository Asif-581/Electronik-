import React from "react";
import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { getAllProducts } from "../features/product/ProductSlice";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helper";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/product/SingleProductSlice";
import { Product, productType } from "../Types/type";
import { STATUS } from "../constants/Status";
const ListView = () => {
  const { products, status } = useAppSelector((store) => store.products);
  const { filteredProducts } = useAppSelector((store) => store.filterProducts);
  const dispatch = useAppDispatch();
  const [img, setImg] = useState("");
  const { id } = useParams();

  const isMobile = useMediaQuery("(max-width:600px)");



  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  // if (status === STATUS.LOADING) {
  //   return <Loading />;
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        marginY: "32px",
        width: "100%",
      }}
    >
      {(filteredProducts.length === 0 ? products : filteredProducts).map(
        (product: Product, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: "1rem",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.10)",
                borderRadius: "12px",
                padding: "1.5rem",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{ width: "220px", height: "170px", position: "relative" }}
              >
                {status === STATUS.LOADING ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                  
                  />
                ) : (
                  <img
                    src={product.image}
                    alt="image"
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  New
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", sm: "center" },
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: "0.8rem",
                    width: { xs: "100%", sm: "600px" },
                  }}
                >
                  {status === STATUS.LOADING ? (
                    <>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height={40}
                     
                      />
                      <Skeleton
                        variant="text"
                        width="10%"
                        height={20}
                        
                      />
                      <Skeleton
                        variant="text"
                        width="90%"
                        height={40}
                        
                      />
                      <Skeleton
                        variant="text"
                        width="15%"
                        height={50}
                       
                      />
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        
                      >
                        {product?.name}
                      </Typography>
                      <Typography
                        component="p"
                        
                      >
                        {formatPrice(product.price!)}
                      </Typography>
                      {isMobile ? null : (
                        <Typography
                          component="p"
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.5,
                            maxHeight: "4.5rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                           
                          }}
                        >
                          {product?.description?.slice(0, 150)}
                        </Typography>
                      )}

                      <Link to={`${product.id}`}>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          sx={{
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          );
        }
      )}
    </Box>
  );
};

export default ListView;
