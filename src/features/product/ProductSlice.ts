import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../constants/Status";
import { categories, companies, Product, productType } from "../../Types/type";
import api from "./../../../AxiosInterceptor";

const productsRoute = "/api/products";

// type Product = {
//   id: string | null;

//   name: string;
//   company: string;
//   description: string;
//   image: string | undefined;
//   price: number;
//   category: string | null;
//   quantity: number;
//   stock: number;
// };

// export type QueryParams = {
//   category_id?: string,
//   company_id?:string
// }

type allProductsType = {
  status: string;
  products: Product[];
  gridView: boolean;
  categories: categories[];
  companies: companies[];
  // searchedProducts: productType[];
};

const initialState: allProductsType = {
  status: "",
  products: [],
  gridView: true,
  categories: [],
  companies: [],
  // searchedProducts:[]
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload as Product[];
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getAllProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<categories[]>) => {
          state.categories = action.payload as categories[];
          state.status = STATUS.IDLE;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(
        fetchCompanies.fulfilled,
        (state, action: PayloadAction<companies[]>) => {
          state.companies = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const fetchCategories = createAsyncThunk<categories[], void>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/categories`);
      const { data } = response;

      return data as categories[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompanies = createAsyncThunk<companies[], void>(
  "companies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/companies`);
      const { data } = response;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "fetch/products",
  async (params?: URLSearchParams) => {
    const route = params ? `/api/products?${params.toString()}` : productsRoute;

    return (await api.get(route)).data as Product[];
  }
);

export const createProduct = createAsyncThunk<void, productType>(
  "create/products",
  async (data: productType) => {
    await api.post(productsRoute, data);
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({
    productId,
    updatedProduct,
  }: {
    productId: string;
    updatedProduct: Product;
  }) => {
    try {
      const response = await api.put(
        `/api/products/${productId}`,
        updatedProduct
      );

      if (response.status !== 200) {
        throw new Error(`Update request failed with status ${response.status}`);
      }

      return response.data as Product;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProductAsync",
  async (productId: string | null) => {
    try {
      await api.delete(`${productsRoute}/${productId}`);
    } catch (error: any) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const { setGridView } = ProductSlice.actions;
export default ProductSlice.reducer;
// function action(state: WritableDraft<allProductsType>, action: PayloadAction<any[] | null | undefined, string, { arg: string; requestId: string; requestStatus: "fulfilled"; }, never>): void | allProductsType | WritableDraft<allProductsType> {
//   throw new Error("Function not implemented.");
// }
