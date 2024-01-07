import { Box, MenuItem, TextField, Typography } from "@mui/material";

import React from "react";
import { useAppSelector, useAppDispatch } from "./../Store/hooks";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { formatPrice, getUniqueValues } from "../utils/helper";
import {
  filterByCategories,
  filterByCompany,
  filterBySearch,
  filterByColor,
  filterByPrice,
} from "../features/product/FilterProductsSlice";
import { productType } from "../Types/type";

const Filter = () => {
  const { products } = useAppSelector((store) => store.products);
  const { darkMode } = useAppSelector((store) => store.theme);
  const [company, setCompany] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const dispatch = useAppDispatch();

  const categories = getUniqueValues(products, "category");
  const companies = getUniqueValues(products, "company");
  const colors = getUniqueValues(products, "colors");
  let price = products.map((productPrice: productType) => productPrice.price!);
   const maxPrice = products.length > 0 ? Math.max(...price) : 0; 
  const [productPrice, setProductPrice] = React.useState<number>(maxPrice);

  const handleCategoryFilter = (category: string) => {
    dispatch(filterByCategories({ products, category }));
  };
  const handleCompanyFilter = (e: SelectChangeEvent) => {
    const selectedCompany = e.target.value;
    setCompany(selectedCompany);
    dispatch(filterByCompany({ products, selectedCompany }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue((prevInputValue) => {
      dispatch(filterBySearch({ products, inputValue: newValue }));
      return newValue;
    });
  };

  const handleColorFilter = (color: string) => {
    dispatch(filterByColor({ products, color }));
  };

  const handlePriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setProductPrice(value);
    dispatch(filterByPrice({ products, value }));
  };

  return (
    <>
      <Box>
        <TextField
          sx={{
            bgcolor: "#f1f5f8",
          }}
          variant="outlined"
          size="small"
          onChange={handleSearch}
          value={inputValue}
          placeholder="Search..."
        />
        <Box
          sx={{
            marginY: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Category
          </Typography>
          {categories.map((category: string) => {
            return (
              <button
                key={category}
                style={{
                  cursor: "pointer",
                  lineHeight: "1.7rem",
                  letterSpacing: "0.075rem",
                  textAlign: "left",
                  border: "none",
                  backgroundColor: `${darkMode ? "black" : "white"} `,
                  color: `${darkMode ? "white" : "black"}`,
                  fontSize: "1rem",
                }}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            );
          })}
        </Box>
        <FormControl sx={{ minWidth: 100 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Company
          </Typography>
          <Select
            value={company}
            onChange={handleCompanyFilter}
            displayEmpty
            variant="outlined"
            inputProps={{ "aria-label": "Without label" }}
            size="small"
            sx={{ bgcolor: "#f1f5f8" }}
          >
            <MenuItem value="" disabled>
              Select Company
            </MenuItem>
            {companies.map((company: string) => {
              return (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{ marginY: "1.5rem" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ margin: "5px" }}
          >
            Colors
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            {colors.map((color: string, index: number) => {
              return (
                <Box key={index}>
                  <div
                    style={{
                      borderRadius: "50%",
                      backgroundColor: `${color}`,
                     border:`${color!='All'?'1px solid blue':null}`,
                      cursor: "pointer",
                      height: "20px",
                      width: "20px",
                    }}
                    onClick={() => handleColorFilter(color)}
                  >
                    {color === "All" ? "All" : null}
                  </div>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", margin: "5px" }}
          >
            Price
          </Typography>
          {formatPrice(productPrice)}
          <Box>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={productPrice}
              defaultValue={maxPrice}
              onChange={handlePriceFilter}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Filter;
