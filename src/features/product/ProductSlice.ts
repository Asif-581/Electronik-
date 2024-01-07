import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { STATUS } from "../../constants/Status";
import { productType } from "../../Types/type";
import api from "./../../../AxiosInterceptor";
import { supabase } from "../../Config/supabase";

type Product = {
  id: string | null;

  name: string;
  company: string;
  description: string;
  image: string | undefined;
  price: number;
  category: string | null;
  quantity: number;
  stock: number;
};

type allProductsType = {
  status: string;
  products: productType[];
  gridView: boolean;
  // searchedProducts: productType[];
};

const initialState: allProductsType = {
  status: "",
  products: [],
  gridView: true,
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
        (state, action: PayloadAction<productType[]>) => {
          state.products = action.payload as productType[];
          state.status = STATUS.IDLE;
        })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      })
  },
 
});

export const getAllProducts = createAsyncThunk("fetch/products", async (productName:string) => {
  // const response = await api.get<productType[]>(
  //   `/rest/v1/products?order=created_at.desc`
  // );
    const { data, error } = await supabase
      .from("products")
      .select()
    .ilike("name", `%${productName}%`)
    .order('created_at', { ascending: false });
    console.log("Search Results:", data);
    return data as productType[];
 
});

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({
    productId,
    updatedProduct,
  }: {
    productId: string | null;
    updatedProduct: Product;
  }) => {
    try {
      const response = await api.put(
        `/rest/v1/products?id=eq.${productId}`,
        updatedProduct
      );

      return response.data as Product;
    } catch (error: any) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

export const deleteProductAsync = createAsyncThunk("products/deleteProductAsync", async (
  productId:string | null) => {
  try {
    await api.delete(`/rest/v1/products?id=eq.${productId}`);
  }
  catch (error: any) {
     console.error("Error updating product:", error);
     throw error;
  }
});




export const { setGridView } = ProductSlice.actions;
export default ProductSlice.reducer;
// function action(state: WritableDraft<allProductsType>, action: PayloadAction<any[] | null | undefined, string, { arg: string; requestId: string; requestStatus: "fulfilled"; }, never>): void | allProductsType | WritableDraft<allProductsType> {
//   throw new Error("Function not implemented.");
// }

