import React from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { getAllProducts } from "../features/product/ProductSlice";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/helper";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../features/product/SingleProductSlice";
import { productType } from "../Types/type";
import { STATUS } from "../constants/Status";
const ListView = ({ darkMode }: { darkMode : boolean | undefined}) => {
  const { products, status } = useAppSelector((store) => store.products);
  const { filteredProducts } = useAppSelector((store) => store.filterProducts);
  const dispatch = useAppDispatch();
  const [img, setImg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllProducts(""));
  }, []);

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
        (product: productType, index: number) => {
          return (
            <Box key={index} sx={{ display: "flex", gap: "2rem" }}>
              <Box sx={{ width: "220px", height: "170px" }}>
                {status === STATUS.LOADING ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
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
                    style={{ borderRadius: "5px" }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: "0.6rem",
                    width: "600px",
                  }}
                >
                  {status === STATUS.LOADING ? (
                    <>
                      <Skeleton
                        variant="text"
                        width="20%"
                        height={40}
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width="10%"
                        height={20}
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width="90%"
                        height={40}
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                      <Skeleton
                        variant="text"
                        width="15%"
                        height={50}
                        sx={{
                          bgcolor: `${darkMode && "rgba(255, 255, 255, 0.1)"}`,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" fontWeight="bold">
                        {product?.name}
                      </Typography>
                      <Typography component="p">
                        {formatPrice(product.price!)}
                      </Typography>
                      <Typography component="p">
                        {product?.description?.slice(0, 150)}
                      </Typography>
                      <Link to={`${product.id}`}>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
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
