import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import React from "react";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RootLayout from "./Layouts/RootLayout";
import SingUp from "./pages/SingUp";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import PrivateRoute from "./utils/PrivateRoute";
import { getCurrentLoggedInUser } from "./utils/helper";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="order" element={<OrderPage />} />

        <Route path="products/:id" element={<SingleProduct />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SingUp />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
