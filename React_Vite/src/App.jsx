import React from "react";
import Home from "./components/pages/home";
import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import ProductDetails from "./components/pages/productdetails";
import AddProduct from "./components/Backend/AddProduct";
import { AuthProvider } from "./components/context/AuthContext";
import Category from "./components/pages/category";

const allRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    // Use a colon (:) to define a route parameter
    path: '/productdetails/:productId',
    element: <ProductDetails />,
  },
  {
    path: '/addProduct',
    element: <AddProduct />,
  },
  {
    path: '/category/:presentFilter',
    element: <Category />,
  },
  // {
  //   path: '/signin',
  //   element: <Signin />,
  // },
  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
  
]);



const App = () => {
  
  return (
      <AuthProvider>
        <RouterProvider router={allRoutes} />
        
      </AuthProvider>
      
  );
};

export default App;