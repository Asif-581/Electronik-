import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { productType } from "../Types/type";
type navigationType = {
  title: string | undefined;
  product?: productType | null
}


const Navigation = ({ title, product }: navigationType) => {
  return (
    <Box role="presentation" sx={{ bgcolor: "lightgray" }} component="div">
      <Breadcrumbs
        aria-label="breadcrumb"
        component="nav" // Specify the component prop here (use "nav" element)
        sx={{
          display: "flex",
          alignItems: "center",
          height: { xs: "15vh", sm: "15vh" },
          marginX: { xs: "20px", sm: "170px" },
        }}
      >
        <Typography variant="h4" fontWeight="thin">
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
