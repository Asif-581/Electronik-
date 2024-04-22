import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { getAllProducts } from "../features/product/ProductSlice";
import { Box, Typography } from "@mui/material";
import { formatPrice } from "../utils/helper";
import { Link } from "react-router-dom";

export default function CircularDemo() {
  const { products, gridView, categories } = useAppSelector(
    (store) => store.products
  );
  const dispatch = useAppDispatch();


  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const productTemplate = (product) => {
    return (
      <div
        className="border-1 surface-border border-round m-2 text-center py-5 px-3 product-card"
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          height: "450px", // Set a fixed height for all product cards
          width: "400px", // Set a fixed width for all product cards
        }}
      >
        <div
          className="mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px", // Set a fixed height for the image container
          }}
        >
          <Link to={`products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxHeight: "100%", // Ensure the image doesn't exceed the container height
                maxWidth: "100%", // Ensure the image doesn't exceed the container width
                objectFit: "contain", // Maintain aspect ratio and fit within the container
              }}
            />
          </Link>
        </div>
        <div>
          <h4 className="mb-1 product-name" style={{ color: "#333" }}>
            {product.name}
          </h4>
          <h5 className="mt-0 mb-3 product-price" style={{ color: "#666" }}>
            {formatPrice(product.price)}
          </h5>
          <h6 className="mt-0 mb-3 product-price" style={{ color: "#666" }}>
            {product.description.slice(0, 120)}
          </h6>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        marginBottom="10px"
      >
        Trending Products
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
      <Carousel
        value={products}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
        style={{ backgroundColor: "#f8f8f8", padding: "15px" }}
      />
    </div>
  );
}
