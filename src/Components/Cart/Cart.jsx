import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from './../LoadingScreen/LoadingScreen';
import { formatPrice } from '../../utilities/PriceFormatter';
import CartProduct from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import emptyCartImage from '../../assets/EmptyCart.webp';
import { Helmet } from 'react-helmet-async';

export default function Cart() {


  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserCart();
  }, [])

  async function getUserCart() {
    setIsLoading(true)
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token")
      }
    }).finally(() => {
      setIsLoading(false)
    });
    setCart(data);
  }


  async function clearCart() {
    setIsLoading(true);
    try {
      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCart(null);
      setIsLoading(false)
    } catch (e) {
      console.log(e);
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }



  return (
    cart ? <div className="pt-20">
      <Helmet>
        <title>FreshCart - Cart</title>
      </Helmet>
      <h1 className="text-main-theme mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart?.data.products.map((product, index) => {
            return <CartProduct key={index} product={product} setCart={setCart} cart={cart} />
          })}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 sticky top-10">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{formatPrice(cart?.data.totalCartPrice)}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to={"/shippingAddressCash/" + cart?.data._id} className="mt-6 w-full block text-center rounded-md bg-main-theme py-1.5 font-medium text-blue-50 hover:bg-background-primary  hover:text-main-theme transition-all duration-300">Check out (Cash Order)</Link>
          <Link to={"/shippingAddress/" + cart?.data._id} className="mt-6 w-full block text-center rounded-md bg-main-theme py-1.5 font-medium text-blue-50 hover:bg-background-primary  hover:text-main-theme transition-all duration-300">Check out (Pay with Visa)</Link>
        </div>
      </div>
      <button onClick={clearCart} className="mt-6 px-4 py-2 block text-center rounded-md bg-main-theme mx-auto font-medium text-blue-50 hover:bg-background-secondary dark:hover:bg-background-primary hover:text-main-theme transition-all duration-300">Clear Cart</button>
    </div> : <div className="flex flex-col items-center justify-center h-screen -mt-20">
      <Helmet>
        <title>FreshCart - Cart</title>
      </Helmet>
      <img src={emptyCartImage} alt="Empty Cart" className="w-1/2 mb-8" />
      <h2 className="text-2xl font-semibold text-white dark:text-secondary-theme mb-4">Your Cart is Empty</h2>
      <p className="text-white dark:text-secondary-theme mb-6">Looks like you haven't added anything to your cart yet.</p>
      <Link to="/" className="rounded-md bg-main-theme px-4 py-2 font-medium text-blue-50 hover:bg-background-secondary dark:hover:bg-background-primary hover:text-main-theme transition-all duration-300">
        Continue Shopping
      </Link>
    </div>
  )
}
