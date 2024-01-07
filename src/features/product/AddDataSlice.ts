import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productType } from "../../Types/type";
import api from "../../../AxiosInterceptor";

interface AddDataState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddDataState = {
  status: "idle",
  error: null,
};

export const addData = createAsyncThunk<void, productType>(
  "addData/addData",
  async (data: productType) => {
    await api.post(`/rest/v1/products`, data);
  }
);

const addDataSlice = createSlice({
  name: "addData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addData.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Unknown error occurred";
      });
  },
});

export default addDataSlice.reducer;
