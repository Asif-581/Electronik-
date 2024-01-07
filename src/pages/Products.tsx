import React, { useState } from "react";
import Navigation from "../components/Navigation";
import GridView from "../components/GridView";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import ListView from "../components/ListView";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useAppDispatch, useAppSelector } from "./../Store/hooks";
import { setGridView } from "../features/product/ProductSlice";
import Filter from "../components/Filter";
import { sortProduct } from "../features/product/FilterProductsSlice";
type SortingOption = "highestPrice" | "lowestPrice" | "nameAZ" | "nameZA";

const Products = () => {
  const { products, gridView } = useAppSelector((store) => store.products);
  const { filteredProducts } = useAppSelector((store) => store.filterProducts);
  const { darkMode } = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();

  const [sortingOption, setSortingOption] = useState<SortingOption | "">(
    "lowestPrice"
  );

  const handleSortingChange = (
    event: SelectChangeEvent<SortingOption | unknown>
  ) => {
    const value = event.target.value
    setSortingOption(value as SortingOption);
    dispatch(sortProduct({products,value}));
  };

  const handleGridClick = () => {
    dispatch(setGridView(true));
  };

  const handleListClick = () => {
    dispatch(setGridView(false));
  };

  return (
    <>
      <Navigation title={"products"} />
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            paddingX: "175px",
            paddingTop: "64px",
            bgcolor: `${darkMode ? "#040D12" : "white"} `,
            color: `${darkMode ? "white" : "black"}`,
          }}
        >
          {" "}
          <Box position="relative">
            <Stack
              style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
                width: "250px",
                padding: "1rem",
                backgroundColor: `${darkMode ? "black" : "white"} `,
                color: `${darkMode ? "white" : "black"}`,
              }}
            >
              <Filter />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "1170px",
              flexDirection: "column",
              paddingTop: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <div>
                  <GridViewIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleGridClick}
                  />
                </div>
                <div>
                  <ListAltIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleListClick}
                  />
                </div>
              </Box>
              <Box>
                <Typography>{`${
                  (filteredProducts.length === 0 ? products : filteredProducts)
                    .length
                } products`}</Typography>
              </Box>
              <Box
                sx={{ width: "465px", paddingTop: "12px", fontWeight: "bold" }}
              >
                <hr />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography>Sort By</Typography>
                <Select
                  value={sortingOption}
                  onChange={handleSortingChange}
                  size="small"
                  sx={{ bgcolor: "#f1f5f8" }}
                >
                  <MenuItem value="highestPrice">Price (Highest)</MenuItem>
                  <MenuItem value="lowestPrice">Price (Lowest)</MenuItem>
                  <MenuItem value="nameAZ">Name (A-Z)</MenuItem>
                  <MenuItem value="nameZA">Name (Z-A)</MenuItem>
                </Select>
              </Box>
            </Box>
            {gridView ? (
              <GridView darkMode={darkMode} />
            ) : (
              <ListView darkMode={darkMode} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Products;
