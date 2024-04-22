import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartItem, productType } from "../../Types/type";
import api from "./../../../AxiosInterceptor";
import { STATUS } from "../../constants/Status";

type cartType = {
  cart: cartItem[];
  status: string;
  itemQuantity: number;
  totalPrice: number;
  count:number
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
  totalPrice: 0,
  count:0,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (cartItem: cartRequest, { rejectWithValue }) => {
    try {
      await api.post("/api/cart", cartItem);
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCartItemAsync = createAsyncThunk(
  "cart/getCartItemAsync",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/cart/${userId}`);

      return response.data.data as cartItem[];
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (id: string, { rejectWithValue }) => {
    console.log(id);
    try {
      await api.delete<cartItem[]>(`/api/cart/${id}`);
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserCartCount = createAsyncThunk(
  "cart/getCartLength",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/cart/user/${userId}/count`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching cart count:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const isProductExistInCart = createAsyncThunk(
  "cart/isProductExistInCart",
  async (
    { productId, userId }: { productId: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }

      const response = await api.get(
        `api/cart?product_id=${productId}&user_id=${userId}`
      );
      const { count } = response.data;
      return count;
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ cartId, product_id, quantity }: cartItem) => {
    try {
      const response = await api.patch(`/api/cart/${cartId}`, {
        product_id,
        quantity,
      });
    } catch (error: any) {
      console.error("Error updating cart items:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const clearAllCartItems = createAsyncThunk(
  "cart/clearAllCartItems",

  async (userId: string) => {
    await api.delete(`/api/cart/user/${userId}`);
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

    },
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
export const { calculateTotalQuantity, calculateTotalPrice } =
  CartSlice.actions;
export default CartSlice.reducer;
function rejectWithValue(message: any): any {
  throw new Error("Function not implemented.");
}
