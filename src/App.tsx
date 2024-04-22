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
import React, { useEffect } from "react";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RootLayout from "./Layouts/RootLayout";
import SingUp from "./pages/SingUp";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
// import PrivateRoute from "./utils/PrivateRoute";

 import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import api from "../AxiosInterceptor";
import Context from "./context/userContext.ts";
import ContactPage from "./pages/ContactPage.tsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="products/:id" element={<SingleProduct />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SingUp />} />
    </>
  )
);

function App() {


//   const fetchUserDetails = async () => {
//     const response = await api.get('/api/user_details');
//     return response.data;
// }


//   useEffect(() => {
    
//   fetchUserDetails()
  
//   }, [])
  

  return (
    <>
      {/* <Context.Provider value={fetchUserDetails}> */}
        <ToastContainer />
        <RouterProvider router={router} />
      {/* </Context.Provider> */}
    </>
  );
}

export default App;
