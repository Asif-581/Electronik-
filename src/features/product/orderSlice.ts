import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../../AxiosInterceptor";
import { STATUS } from "../../constants/Status";
import { cartItem } from "../../Types/type";


type Product = {
  name: string;
  price: number;
  image: string;
};

type AddressInfo = {
  fullName: string;
  address: string;
  pincode: string;
  mobileNumber: string;
};

type CartItem = {
  quantity: number;
  color: string;
  products: Product;
  totalItemPrice: number;
};

type Order = {
  id: string;
  address_info: AddressInfo;
  payment_id: string;
  created_at: string;
  orderItem: CartItem[];
  status: string;
  orderTotal: number;
};


type initialType = {
  status: string;
  orderDetails: Order[];
};

const initialState: initialType = {
  status: "",
  orderDetails: [],
};



export const getOrderItem = createAsyncThunk(
  "orders/getOrderItem",
  async (userId:string) => {
    try {
      const orderDetail = await api.get(
        `/api/orders/${userId}`
      );
    const orders: Order[] = orderDetail.data.data.map((order: any) => ({
      id: order.id,
      address_info: order.address_info,
      payment_id: order.payment_id,
      created_at: order.created_at,
      orderItem: order.cart.map((c: cartItem) => {
        c.totalItemPrice = c.quantity! * c.products.price;
        return c;
      }),
      status: order.status,
      orderTotal: order.cart.reduce((accum:number, curr:cartItem) => curr.totalItemPrice + accum,0),
    }));
        
      return orders;
        
    } catch (error: any) {
      console.error("Error fetching cart items:", error);
      
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderItem.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.orderDetails = action.payload!;
        state.status = STATUS.IDLE;
      })

      .addCase(getOrderItem.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
 
});

export default orderSlice.reducer;