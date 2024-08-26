import React, { useContext, useEffect, useState } from 'react'
import { addProductToCart } from '../../utilities/cartService'
import { ThemeContext } from '../../Contexts/ThemeContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import emptyWishImage from '../../assets/emptywish.webp'
import { Link } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export default function WishList() {
    let { isDarkMode } = useContext(ThemeContext);

    async function removeWishListItem(productId) {

        await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        toast.success('Product Removed from WishList', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? 'dark' : 'light',
            transition: Bounce,
        });

        refetch();
    }

    async function getUserWishList() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["wishList"],
        queryFn: getUserWishList,
        select: (data) => data.data.data
    })



    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        data?.length > 0 ? <section>
            <Helmet>
                <title>FreshCart - WishList</title>
            </Helmet>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-background-secondary dark:bg-background-primary">
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-main-theme sm:text-3xl">Your WishList</h1>
                    </header>
                    <div className="mt-8 p-4">
                        <ul className="space-y-4">
                            {data?.map((product, index) => {
                                return <li key={index} className="flex flex-col md:flex-row items-center gap-4">
                                    <img
                                        src={product?.imageCover}
                                        alt=""
                                        className="size-40 rounded object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm text-secondary-theme dark:text-main-theme">{product?.title}</h3>
                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-main-theme">
                                            <div>
                                                <dt className="inline">Price:</dt>
                                                <dd className="inline">${product?.price}</dd>
                                            </div>

                                            <div>
                                                <dt className="inline">Brand:</dt>
                                                <dd className="inline">{product?.brand?.name}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end gap-2">
                                        <button onClick={() => addProductToCart(product._id, isDarkMode)}
                                            className="text-secondary-theme bg-main-theme hover:bg-white focus:ring-4 focus:ring-secondary-theme font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:hover:bg-white dark:hover:text-main-theme dark:focus:ring-background-secondary transition-all duration-300"
                                        >
                                            Add to cart
                                        </button>

                                        <button onClick={() => removeWishListItem(product._id)}
                                            className="text-white bg-background-primary hover:text-secondary-theme hover:bg-white focus:ring-4 focus:ring-secondary-theme font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-400 dark:text-white dark:hover:bg-white dark:hover:text-main-theme dark:focus:ring-background-secondary transition-all duration-300"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section> :
            <div className="text-center py-12">
                <Helmet>
                    <title>FreshCart - WishList</title>
                </Helmet>
                <div className="flex flex-col items-center">
                    <img
                        src={emptyWishImage}
                        alt="Empty Wishlist"
                        className="mb-6 w-128 h-128 object-cover"
                    />
                    <h2 className="text-xl font-bold text-main-theme sm:text-2xl">Your WishList is Empty</h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-main-theme">
                        It looks like you haven't added any products to your wishlist yet. Start exploring and add your favorite products!
                    </p>
                    <Link to={"/products"}
                        className="mt-6 text-white bg-main-theme hover:bg-white hover:text-secondary-theme dark:hover:bg-secondary-theme dark:hover:text-white focus:ring-4 focus:ring-secondary-theme font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>

    )
}
