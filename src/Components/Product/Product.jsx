import React, { useContext, useEffect, useState } from 'react';
import Rating from './../Rating/Rating';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { addProductToCart } from '../../utilities/cartService';
import { addProductToWishList, getWishList, removeWishListItem } from '../../utilities/wishListService';

export default function Product({ product }) {
    const { isDarkMode } = useContext(ThemeContext);
    const [isInWishList, setIsInWishList] = useState(false);

    async function checkUserWishList() {
        const wishListData = await getWishList();
        setIsInWishList(wishListData.some(item => item._id === product._id));
    }

    useEffect(() => {
        checkUserWishList();
    }, [product._id])

    async function toggleWishList() {
        if(isInWishList){
            await removeWishListItem(product._id, isDarkMode);
            setIsInWishList(false);
        } else {
            await addProductToWishList(product._id, isDarkMode);
            setIsInWishList(true)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-background-secondary dark:bg-background-primary shadow-md rounded-lg max-w-sm flex flex-col justify-between h-full">
                <Link to={"/productDetails/" + product._id}>
                    <img className="rounded-t-lg p-8 w-full object-cover hover:scale-105 transition-all duration-300" src={product.imageCover} alt={product.title} />
                </Link>
                <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
                    <div>
                        <Link to={"/productDetails/" + product._id}>
                            <h3 className="text-secondary-theme dark:text-background-secondary font-semibold text-xl tracking-tight line-clamp-1">{product.title}</h3>
                        </Link>
                        <p className="line-clamp-2 text-background-primary  dark:text-background-secondary">{product.description}</p>
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <Rating rating={product.ratingsAverage} />
                            <button onClick={() => toggleWishList()}>
                                <i className={`fa-solid fa-heart fa-2xl ${isInWishList ? 'text-green-500' : 'hover:text-main-theme dark:text-white dark:hover:text-main-theme'}`}></i>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-secondary-theme dark:text-main-theme">${product.price}</span>
                            <button onClick={() => addProductToCart(product._id, isDarkMode)}
                                className="text-secondary-theme bg-main-theme hover:bg-white focus:ring-4 focus:ring-secondary-theme font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:hover:bg-white dark:hover:text-main-theme dark:focus:ring-background-secondary transition-all duration-300"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
