import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './Contexts/ThemeContext';
import AuthContextProvider from './Contexts/AuthContext';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoutes from './Components/ProtectedAuthRoutes/ProtectedAuthRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import ShippingAddress from './Components/ShippingAddress/ShippingAddress';
import Orders from './Components/Orders/Orders';
import { HelmetProvider } from 'react-helmet-async';
import { Offline } from 'react-detect-offline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import ShippingAddressCash from './Components/ShippingAddressCash/ShippingAddressCash';
import WishList from './Components/WishList/WishList';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes> },
        { path: 'register', element: <ProtectedAuthRoutes><Register /></ProtectedAuthRoutes> },
        { path: 'forgotPassword', element: <ProtectedAuthRoutes><ForgotPassword /></ProtectedAuthRoutes> },
        { path: 'resetPassword', element: <ProtectedAuthRoutes><ResetPassword /></ProtectedAuthRoutes> },
        { path: 'verifyResetCode', element: <ProtectedAuthRoutes><VerifyResetCode /></ProtectedAuthRoutes> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'shippingAddressCash/:cartId', element: <ProtectedRoute><ShippingAddressCash /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'categoryProducts/:id', element: <ProtectedRoute><CategoryProducts /></ProtectedRoute> },
        { path: 'brandProducts/:id', element: <ProtectedRoute><BrandProducts /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ]);

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <HelmetProvider>
        <ThemeProvider>
          <AuthContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
            <Offline>
              <div className='fixed bg-main-theme text-secondary-theme p-4 rounded-md bottom-4 start-4 font-bold'>
                You are Offline!
              </div>
            </Offline>
          </AuthContextProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>


  );
}

export default App;
