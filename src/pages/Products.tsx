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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
type SortingOption = "price-desc" | "price-asc" | "nameAZ-asc" | "nameZA-desc";

const Products = () => {
  const { products, gridView } = useAppSelector((store) => store.products);
  
  
  const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const location = useLocation();

  const [sortingOption, setSortingOption] = useState<SortingOption | "">(
    "price-asc"
  );
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);

  //  const handleSortingChange = (
  //    event: SelectChangeEvent<SortingOption | string>
  //  ) => {
  //    const value = event.target.value;
     

  //    setSortingOption(value as SortingOption);
  //      const searchParams = new URLSearchParams(location.search);
  //      searchParams.delete(value === "name" ? "price" : "name");
  //   //  const searchParams = new URLSearchParams(location.search);

  //   //  // Update the sorting parameter based on the selected value
  //    searchParams.set(sortingOption, value.split("-")[1]);
     

  //    // Update URL with new query string
  //    navigate({
  //      pathname: location.pathname,
  //      search: searchParams.toString(),
  //    });
  //  };

   const handleSortingChange = (
     event: SelectChangeEvent<SortingOption | string>
   ) => {
     const selectedOption = event.target.value;
     setSortingOption(selectedOption as SortingOption);
     const urlSearchParams = new URLSearchParams(location.search);
     urlSearchParams.set("sort", selectedOption);
     navigate({ search: urlSearchParams.toString() });
   };

  const handlePagination = (page: number) => {
    // Update current page
    setCurrentPage(page);
    // Update URL query string with current page
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page.toString());
    navigate({ search: searchParams.toString() });
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-evenly", // Center the content horizontally
            gap: "2rem",
            paddingX: { xs: "20px" },
            paddingTop: "3rem",
          
          }}
        >
          {" "}
          <Box position="relative">
            <Stack
              sx={{
                position: "sticky",
                top: "0",
                zIndex: "1",
                width: { xs: "350px", sm: "250px" },
                padding: "1rem",
               
              }}
            >
              <Filter />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center the content vertically
              width: { xs: "100%", sm: "100%" }, // Adjust width for responsiveness
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
                <Typography>{`${products.length} products`}</Typography>
              </Box>
              <Box
                sx={{
                  width: "465px",
                  paddingTop: "12px",
                  fontWeight: "bold",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <hr />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>Sort By</Typography>
                <Select
                  value={sortingOption}
                  onChange={handleSortingChange}
                  size="small"
                  sx={{ bgcolor: "#f1f5f8" }}
                >
                  <MenuItem value="price-desc">Price (Highest)</MenuItem>
                  <MenuItem value="price-asc">Price (Lowest)</MenuItem>
                  <MenuItem value="nameAZ-asc">Name (A-Z)</MenuItem>
                  <MenuItem value="nameZA-desc">Name (Z-A)</MenuItem>
                </Select>
              </Box>
            </Box>
            {gridView ? (
              <GridView/>
            ) : (
              <ListView/>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center the pagination horizontally
          padding: "1rem", // Add top margin for separation
        }}
      >
        <Pagination
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePagination(page)}
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default Products;
