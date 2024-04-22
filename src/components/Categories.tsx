import { Box, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { fetchCategories } from "../features/product/ProductSlice";
import { Link } from "react-router-dom";
import { STATUS } from "../constants/Status";

const Categories = () => {
  const { categories, status } = useAppSelector((store) => store.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: { xs: 2, md: 4 }, // Adjust the gap between categories based on screen size
      }}
    >
      {status === STATUS.LOADING
        ? // Render skeleton loading if categories are loading
          Array.from({ length: 7 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: { xs: "30px", md: "30px" }, // Adjust the margin-top based on screen size
              }}
            >
              
              <Skeleton  variant="circular" width={120} height={120} />
              <Skeleton  variant="text" width={150} height={30} />
            </Box>
          ))
        : // Render actual content when categories are loaded
          categories.map((category) => (
            <Box
              key={category.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: { xs: "30px", md: "30px" }, // Adjust the margin-top based on screen size
              }}
            >
              <Link to={`/products?category_id=${category.id}`}>
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "80px", md: "120px" }, // Adjust the size of the image container based on screen size
                    height: { xs: "80px", md: "120px" },
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <img
                    src={category.category_image_url}
                    alt={category.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Link>
              <Typography
                key={category.id}
                component="p"
                variant="subtitle1"
                fontWeight="bold"
                marginTop={1}
                textAlign="center" // Center the category name on small screens
              >
                {category.name}
              </Typography>
            </Box>
          ))}
    </Box>
  );
};

export default Categories;
