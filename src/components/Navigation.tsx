import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { productType } from "../Types/type";
type navigationType = {
  title: string | undefined;
  product?: productType | null
}


const Navigation = ({ title, product }: navigationType) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box role="presentation" sx={{ bgcolor: "lightgray" }} component="div">
      <Breadcrumbs
        aria-label="breadcrumb"
        component="nav" 
        sx={{
          display: "flex",
          alignItems: "center",
          height: { xs: "10vh", sm: "10vh" },
          marginX: { xs: "20px", sm: "170px" },
        }}
      >
        <Typography variant={isMobile ? 'h6':'h5'} fontWeight="thin">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            Home{" "}
          </Link>
          {product && (
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              / Products
            </Link>
          )}{" "}
          / {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default Navigation;
