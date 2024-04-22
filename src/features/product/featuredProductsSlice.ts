import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../constants/Status";
import { formatObjResposeToArray } from "../../utils/helper";
import { productType } from "../../Types/type";
import api from "../../../AxiosInterceptor";

type featuredType = {
  status: string;
  featuredProducts: productType[];
};

const initialState: featuredType = {
  status: "",
  featuredProducts: [],
};

export const getFeaturedProducts = createAsyncThunk<
  productType[], // Return type of the async thunk
  void, // Argument type of the async thunk (none in this case)
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>("featuredProducts/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(
      `/api/products?featured=${true}`
    );
    return formatObjResposeToArray(response.data);
  } catch (error) {
    // Handle your error here if needed
    return rejectWithValue({
      errorMessage: "Error fetching featured products",
    });
  }
});

const featuredProductSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeaturedProducts.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(
        getFeaturedProducts.fulfilled,
        (state, action: PayloadAction<productType[]>) => {
          state.featuredProducts = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getFeaturedProducts.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export default featuredProductSlice.reducer;
