
import {  PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../Store/store";
import api from "../../../AxiosInterceptor";

interface CartCountState {
  count: number;
}

const initialState: CartCountState = {
  count: 0,
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;


export const updateCartCount = (userId:string): AppThunk => async (dispatch) => {
  try {
    // Assume you have a function to fetch cart count from API
    const response = await api.get(`api/cart/user/${userId}/count`);
    dispatch(setCartCount(response.data.count));
  } catch (error) {
    // Handle error
    console.error("Error updating cart count from API:", error);
  }
};

export default cartCountSlice.reducer;
