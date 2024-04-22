import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Toast } from "primereact/toast";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
  Switch,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { addData } from "../features/product/AddDataSlice";
import { productType } from "../Types/type";
import { createProduct, fetchCategories, fetchCompanies, getAllProducts } from "../features/product/ProductSlice";

const validationSchema = yup.object({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  company: yup.string().required("Enter company name"),
  description: yup.string().required("Enter product description"),
  image: yup.string().url().required("Please enter a valid image URL"),
  colors: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one color")
    .required("Color is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  stock: yup
    .number()
    .nullable()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .positive("Stock must be a positive number")
    .moreThan(0, "Stock cannot be zero or less than zero"),
  thumbnailImage: yup
    .array()
    .of(yup.string().url("Invalid URL"))
    .required("Thumbnail Image is required"),
  featured: yup.boolean().required("Please specify if the product is featured"),
});

const AddProduct = ({ setOpen }) => {
    const toast = useRef(null);
  const dispatch = useAppDispatch();
 const {  categories, companies } = useAppSelector(
   (store) => store.products
 );
  
  const formik = useFormik<productType>({
    initialValues: {
      name: "",
      description: "",
      stock: null,
      price: 0,
      image: "",
      category: "",
      company: "",
      colors: [],
      featured: false,
      thumbnailImage: [""],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(createProduct(values));
      resetForm();
      setOpen(false);
      dispatch(getAllProducts());

        
    },
    
  });

  
useEffect(() => {
  dispatch(fetchCategories());
  dispatch(fetchCompanies());
  
}, [])

   const colorsOptions = [
     { label: "Red", value: "Red" },
     { label: "Black", value: "Black" },
     { label: "Green", value: "Green" },
   ];


  return (
    <>
      <Toast ref={toast} position="top-right" />
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "500px",
        }}
      >
        <TextField
          label="Name"
          id="name"
          name="name"
          size="small"
          placeholder="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FormControl fullWidth size="small">
          <InputLabel id="company-label">Company</InputLabel>
          <Select
            labelId="company-label"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
          >
            {/* Assuming companies is an array of company names */}
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.company_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="price"
          name="price"
          label="Price"
          placeholder="Price"
          size="small"
          type="number"
          value={
            formik.values.price !== undefined ? String(formik.values.price) : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />

        {/* Repeat TextField for description, image, price, stock */}

        <TextField
          id="stock"
          name="stock"
          label="Stock"
          placeholder="Stock"
          type="number"
          value={
            formik.values.stock !== null ? String(formik.values.stock) : ""
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />

        <TextField
          label="Image"
          id="image"
          name="image"
          size="small"
          placeholder="Image URL"
          type="text"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />

        <FormControl fullWidth>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            label="Select Category"
          >
            {categories.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          id="description"
          name="description"
          label="Description"
          placeholder="Description"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <div>
          <FormControl fullWidth>
            <InputLabel id="colors-label">Select Color(s)</InputLabel>
            <Select
              labelId="colors-label"
              id="colors"
              name="colors"
              multiple
              value={formik.values.colors}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              renderValue={(selected) => (
                <div>
                  {(selected as string[]).map((value) => (
                    <div key={value}>{value}</div>
                  ))}
                </div>
              )}
            >
              {colorsOptions.map((color) => (
                <MenuItem key={color.value} value={color.value}>
                  {color.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formik.touched.colors && formik.errors.colors && (
            <small className="p-error">{formik.errors.colors}</small>
          )}
        </div>

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          marginY="1rem"
        >
          <label>Enter Thumbnail image</label>
          <Box display="flex" flexDirection="column" gap="5px">
            {formik.values.thumbnailImage.map(
              (thumbnailImage: string, index: number) => (
                <Box key={index} display="flex" gap="1rem">
                  <TextField
                    variant="outlined"
                    size="small"
                    name={`thumbnailImage.${index}`}
                    value={formik.values.thumbnailImage[index]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.thumbnailImage &&
                      !!formik.errors.thumbnailImage &&
                      !!formik.errors.thumbnailImage[index]
                    }
                    helperText={
                      formik.touched.thumbnailImage &&
                      formik.errors.thumbnailImage &&
                      formik.errors.thumbnailImage[index]
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (formik.values.thumbnailImage.length > 1) {
                        formik.values.thumbnailImage.splice(index, 1) &&
                          formik.setValues({ ...formik.values });
                      }
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (formik.values.thumbnailImage.length < 5) {
                        formik.values.thumbnailImage.splice(index + 1, 0, "") &&
                          formik.setValues({ ...formik.values });
                      }
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Box>
        <FormControlLabel
          control={
            <Switch
              id="featured"
              name="featured"
              checked={formik.values.featured}
              onChange={(e) => {
                formik.setFieldValue("featured", e.target.checked);
              }}
              color="primary"
            />
          }
          label="Featured"
        />
        {/* Dropdown for colors */}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Save
        </Button>
      </form>
    </>
  );
};




export default AddProduct;
