import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productType } from "../../Types/type";

type filter = {
  filteredProducts: productType[];
  
};
const initialState: filter = {
  filteredProducts: [],
 
};

const FilterProductsSlice = createSlice({
  name: "filterProducts",
  initialState,
  reducers: {
    sortProduct: (state, action) => {
      const { products, value } = action.payload;
      switch (value) {
        case "lowestPrice":
          state.filteredProducts = [...products].sort(
            (a, b) => a.price - b.price
          );
          break;
        case "highestPrice":
          state.filteredProducts = [...products].sort(
            (a, b) => b.price - a.price
          );
          break;
        case "nameAZ":
          state.filteredProducts = [...products].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "nameZA":
          state.filteredProducts = [...products].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          state.filteredProducts = products;
      }
    },

    filterBySearch: (state, action) => {
      const { products, inputValue } = action.payload;
      if (inputValue.trim() === '') {
        state.filteredProducts = products;
      }
      else {
        state.filteredProducts = [...products].filter((product: productType) =>
          product?.name!.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
  
    },

    filterByCategories: (
      state,
      action: PayloadAction<{ category: string; products: productType[] }>
    ) => {
      const { products, category } = action.payload;
      if (category === "all") {
        state.filteredProducts = products;
      } else {
        state.filteredProducts = products.filter(
          (product) => product.category === category
        );
      }
    },
    filterByCompany: (state, action) => {
      const { products, selectedCompany } = action.payload;

      if (selectedCompany === "all") {
        state.filteredProducts = products;
      } else {
        state.filteredProducts = products.filter(
          (product: { company: string }) => product.company === selectedCompany
        );
      }
    },
    filterByColor: (state, action) => {
      const { products, color } = action.payload;
      if (color === 'All') {
         state.filteredProducts = products;
      }
      else {
         state.filteredProducts = products.filter(
           (product:productType) => product.colors!.find((productColor:string) => productColor === color) 
         )
      }
    },
    filterByPrice: (state, action) => {
      const { products, value } = action.payload;
      state.filteredProducts = products.filter((product: productType) => product.price! <= value);
    }
  },
});
export const {
  filterByCategories,
  filterByCompany,
  sortProduct,
  filterBySearch,
  filterByColor,
  filterByPrice
} = FilterProductsSlice.actions;
export default FilterProductsSlice.reducer;
