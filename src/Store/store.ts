import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import featuredproductsReducer from "../features/product/featuredProductsSlice";
import singleProductReducer from "../features/product/SingleProductSlice";
import productReducer from "../features/product/ProductSlice"
import addDataReducer from '../features/product/AddDataSlice'
import filterProductsReducer from '../features/product/FilterProductsSlice'
import authReducer from "../features/product/authSlice";
import cartReducer from "../features/product/CartSlice"
import themeReducer from "../features/product/themeSlice";
import ordersReducer from "../features/product/orderSlice";
export const store = configureStore({
  reducer: {
    featuredProducts: featuredproductsReducer,
    singleProduct: singleProductReducer,
    products: productReducer,
    addData: addDataReducer,
    filterProducts: filterProductsReducer,
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
    orders: ordersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;