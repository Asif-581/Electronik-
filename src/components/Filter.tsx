import { Box, Button, MenuItem, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./../Store/hooks";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { productType, categories, companies } from "../Types/type";

import {
  fetchCategories,
  fetchCompanies,
  getAllProducts,
} from "../features/product/ProductSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
const Filter = () => {
  const {categories, companies } = useAppSelector(
    (store) => store.products
  );

  const [company, setCompany] = React.useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBtn, setActiveBtn] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const priceRange = [
    { name: "₹0 - ₹1000", key: "0-1000" },
    { name: "₹1000 - ₹5000", key: "1000-5000" },
    { name: "₹5000 - ₹10000", key: "5000-10000" },
    { name: "₹10000 - ₹20000", key: "10000-20000" },
    { name: "₹20000 - ₹100000", key: "20000-100000" },
  ];
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    name: string;
    key: string;
  }>();

  const handleCategoryFilter = async (filterType: string, id: string) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(filterType, id);

    dispatch(getAllProducts(searchParams));

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    dispatch(getAllProducts(searchParams));
  }, [location.search]);

  const clearFilters = () => {
    setActiveBtn("");
    navigate({ search: "" });
    setSelectedPriceRange(undefined);
  };

  useEffect(() => {
    // getCategories();
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat_id = searchParams.get("category_id");
    console.log(cat_id);
    if (cat_id) {
      setActiveBtn(cat_id);
    }
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    if (min && max) {
      setSelectedPriceRange(priceRange.find((r) => r.key === `${min}-${max}`));
    }
  }, []);

  const handlePriceRangeChange = (e: RadioButtonChangeEvent) => {
    const searchParams = new URLSearchParams(location.search);
    const priceRanges = e.value.key.split("-");
    const min = priceRanges[0];
    const max = priceRanges[1];
    searchParams.set("min", min);
    searchParams.set("max", max);
    setSelectedPriceRange(e.value);
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <Box
        sx={{
          // padding: "1rem",

          borderRadius: "8px",
        }}
      >
        <Box>
          <Button variant="outlined" color="primary" onClick={clearFilters}>
            Clear all filters
          </Button>
        </Box>
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
          {categories.map(({ id, name }) => (
            <button
              key={id}
              style={{
                cursor: "pointer",
                lineHeight: "1.7rem",
                letterSpacing: "0.075rem",
                textAlign: "left",
                border: "none",
                borderRadius: "5px",
                backgroundColor: `${
                  id === activeBtn ? "#252525" : "transparent"
                }`,
                color: `${id === activeBtn ? "whitesmoke" : "black"}`,

                fontSize: "1rem",

                transition:
                  "color 0.3s ease-in-out, border-bottom-color 0.3s ease-in-out",
              }}
              onClick={() => {
                setActiveBtn(id);
                handleCategoryFilter("category_id", id);
              }}
            >
              {name}
            </button>
          ))}
        </Box>
        <FormControl sx={{ minWidth: 100 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Company
          </Typography>
          <Select
            value={company}
            displayEmpty
            variant="outlined"
            inputProps={{ "aria-label": "Without label" }}
            size="small"
          >
            <MenuItem value="" disabled>
              Select Company
            </MenuItem>
            {companies.map((company: companies) => (
              <MenuItem
                key={company.id}
                value={company.company_name}
                onClick={() => handleCategoryFilter("company_id", company.id)}
              >
                {company.company_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ marginTop: "1.5rem" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              margin: "5px",
            }}
          >
            Price
          </Typography>

          <div className="card flex justify-content-first">
            <div className="flex flex-column gap-3">
              {priceRange.map((price) => {
                return (
                  <div key={price.key} className="flex align-items-center">
                    <RadioButton
                      inputId={price.key}
                      name="category"
                      value={price}
                      onChange={(e) => handlePriceRangeChange(e)}
                      checked={selectedPriceRange?.key === price.key}
                    />
                    <label htmlFor={price.key} className="ml-2">
                      {price.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Filter;
