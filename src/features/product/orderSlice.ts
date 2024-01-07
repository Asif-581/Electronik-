import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../../AxiosInterceptor";
import { STATUS } from "../../constants/Status";


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
};

type Order = {
  id: string;
  address_info: AddressInfo;
  payment_id: string;
  created_at: string;
  orderItem: CartItem[];

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
        `/rest/v1/orders?user_id=eq.${userId}&select=id,address_info,payment_id,created_at,cart(quantity,color,products(name,price,image))&order=created_at.desc`
      );
    const orders : Order[] =  orderDetail.data.map((order: any) => ({
      id: order.id,
      address_info: order.address_info,
      payment_id: order.payment_id,
      created_at: order.created_at,
        orderItem: order.cart,
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