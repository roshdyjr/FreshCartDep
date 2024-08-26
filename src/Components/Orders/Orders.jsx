import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { AuthContext } from '../../Contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';


export default function Orders() {

  const { userToken } = useContext(AuthContext);
  const decodedToken = jwtDecode(userToken);
  const userId = decodedToken.id;

  function getUserOrders(userId) {
    return axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + userId);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getUserOrders(userId),
    select: (data) => data.data
  });

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <Helmet>
        <title>FreshCart - Orders</title>
      </Helmet>
      {data?.map((order, index) => {
        return <div key={index} className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl dark:text-secondary-theme lg:text-4xl font-semibold leading-7 lg:leading-9 text-main-theme break-words">
              Order #{order._id}
            </h1>
            <p className="text-base dark:text-secondary-theme font-medium leading-6 text-main-theme">{order.createdAt}</p>
            <p className="text-base dark:text-secondary-theme font-medium leading-6 text-main-theme">Payment Type: {order.paymentMethodType}</p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-background-primary bg-background-secondary px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl self-center md:self-start dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                  <div className="pb-4 md:pb-8 w-full md:w-full">
                    {order.cartItems?.map((product, i) => {
                      return <div key={i} className='flex my-4 py-4 flex-col md:flex-row md:items-center md:my-2 md:py-2 w-full md:justify-between'>
                        <img className="w-full md:w-40 md:block" src={product?.product.imageCover} alt={product?.product.title} />
                        <div className='md:px-10'>
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product?.product.title.split(' ').slice(0, 2).join(' ')}</h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-secondary-theme">Category: </span> {product.product.category.name}</p>
                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-secondary-theme">Brand: </span> {product.product.brand.name}</p>
                            <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-secondary-theme">Rating: </span>{product.product.ratingsAverage}</p>
                          </div>
                        </div>
                        <div className="flex items-start justify-between w-1/2 md:ml-4 pt-4 md:pt-0">
                          <p className="text-base dark:text-white xl:text-lg leading-6">${product.price}</p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.count}</p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Total: ${product.price}</p>
                        </div>
                      </div>
                    })}
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-background-secondary dark:bg-background-primary space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Items Price</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${order?.totalOrderPrice}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Tax Price</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${order?.taxPrice}</p>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">Shipping Price</p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${order?.shippingPrice}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${order?.totalOrderPrice + order?.taxPrice + order?.shippingPrice}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-background-secondary dark:bg-background-primary space-y-6">
                  <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">$0.00</p>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-background-secondary dark:bg-background-primary w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{order.user.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 ">{order.user.email}</p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.city}</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.details}</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.phone}</p>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.city}</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.details}</p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-3 text-gray-600">{order?.shippingAddress.phone}</p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}
