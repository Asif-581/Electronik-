import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../constants/Status";
import { productType } from "../../Types/type";
import api from "./../../../AxiosInterceptor";
// Define the type for the single product object


// Define the state type
type SingleProductState = {
  status: string;
  singleProduct: productType[];
  
};

const initialState: SingleProductState = {
  status: STATUS.IDLE,
  singleProduct: [],
  
  
};

const SingleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.singleProduct = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

// Define the async thunk
export const fetchSingleProduct = createAsyncThunk<productType[], string>(
  "product/fetchSingleProduct",
  async (id: string) => {
    try {
      const response = await api.get(
        `/rest/v1/products?id=eq.${id}`
      );
      return response.data as productType[];
    } catch (error) {
      throw error;
    }
  }
);

export default SingleProductSlice.reducer;
