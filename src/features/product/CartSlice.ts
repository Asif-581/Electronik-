import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartItem, productType} from "../../Types/type";
import api from "./../../../AxiosInterceptor";
import { STATUS } from "../../constants/Status";


type cartType = {
  cart: cartItem[];
  status: string;
  itemQuantity: number;
  totalPrice: number;
 
};
type cartRequest = {
  product_id: string | undefined;
  quantity?: number | null;
  user_id: string;
  color: string;
};

const initialState: cartType = {
  status: "",
  cart: [],
  itemQuantity: 1,
  totalPrice:0,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (cartItem: cartRequest, { rejectWithValue }) => {
    try {
      await api.post("/rest/v1/cart", cartItem);
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItemAsync = createAsyncThunk(
  "cart/getCartItemAsync",
  async (userId:string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/rest/v1/cart?user_id=eq.${userId}&order_id=is.null&select=quantity,id,color,product_id,products(name,price,image,colors)&order=created_at.desc`
      );
      
      return response.data as cartItem[];
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (id:string, { rejectWithValue }) => {
    try {
     
     await api.delete<cartItem[]>(
        `/rest/v1/cart?id=eq.${id}`
      );
    
     
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const isProductExistInCart = createAsyncThunk(
  "cart/isProductExistInCart",
  async (productId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/rest/v1/cart?select=count&product_id=eq.${productId}`
      );
      const { count } = response.data[0];
      return count;
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, product_id, quantity }:cartItem) => {
 const response = await api.patch(`/rest/v1/cart?id=eq.${cartId}`, {
   product_id,
   quantity,
 });
  }
);

export const clearAllCartItems = createAsyncThunk("cart/clearAllCartItems",
  
  async (userId:string) => {
    
    await api.delete(`/rest/v1/cart?user_id=eq.${userId}`);
  }
);




const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    calculateTotalQuantity: (state) => {
      state.itemQuantity = state.cart.reduce(
        (acc, value) => acc + value.quantity!,
        0
      );
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.cart.reduce((acc, value) => {
        return value.quantity! * value.products.price! + acc;
      }, 0);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemAsync.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getCartItemAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = STATUS.IDLE;
      })

      .addCase(getCartItemAsync.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
 
});
export const { calculateTotalQuantity, calculateTotalPrice } = CartSlice.actions;
export default CartSlice.reducer;
