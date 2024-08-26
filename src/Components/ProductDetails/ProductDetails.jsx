import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from './../Rating/Rating';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import RelatedProducts from './../RelatedProducts/RelatedProducts';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { addProductToCart } from '../../utilities/cartService';

export default function ProductDetails() {
    let { id } = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        getProductDetails();
    }, [id]);

    async function getProductDetails() {
        setIsLoading(true);
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id);
        setProductDetails(data.data);
        getRelatedProducts(data.data?.category._id);
        setIsLoading(false);
    }

    async function getRelatedProducts(categoryId) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            params: {
                category: categoryId
            }
        });
        setRelatedProducts(data.data);
    }

    return (
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className="bg-background-primary dark:bg-background-secondary">
                    <main className="my-8">
                        <div className="container mx-auto px-6">
                            <div className="md:flex md:items-start">
                                <div className="w-full md:w-1/3 lg:w-1/4">
                                    <ProductImageSlider images={productDetails?.images} />
                                </div>
                                <div className="w-full md:w-2/3 lg:w-3/4 md:pl-8 lg:pl-16">
                                    <h3 className="text-main-theme dark:text-secondary-theme uppercase text-lg">{productDetails?.title}</h3>
                                    <span className="text-background-secondary dark:text-secondary-theme mt-3 block">${productDetails?.price}</span>
                                    <hr className="my-3 border-background-secondary dark:border-background-primary" />
                                    <div className="mt-3">
                                        <label className="text-main-theme dark:text-secondary-theme text-sm" htmlFor="rating">Rating:</label>
                                        <Rating rating={productDetails?.ratingsAverage ?? 0} />
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-main-theme dark:text-secondary-theme text-sm" htmlFor="category">Category:</label>
                                        <h3 className='text-background-secondary dark:text-secondary-theme'>{productDetails?.category.name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-main-theme dark:text-secondary-theme text-sm" htmlFor="subcategory">SubCategory:</label>
                                        <h3 className='text-background-secondary dark:text-secondary-theme'>{productDetails?.subcategory[0].name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-main-theme dark:text-secondary-theme text-sm" htmlFor="brand">Brand:</label>
                                        <h3 className='text-background-secondary dark:text-secondary-theme'>{productDetails?.brand.name}</h3>
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <Link to={"/cart"} className="px-8 py-2 bg-main-theme text-secondary-theme dark:text-white text-sm font-medium rounded hover:bg-white dark:hover:text-main-theme dark:hover:bg-white focus:outline-none focus:bg-main-theme transition-all duration-300">Order Now</Link>
                                        <button onClick={()=> addProductToCart(productDetails?._id, isDarkMode)} className="mx-2 border rounded-md p-2 hover:bg-background-secondary dark:border-secondary-theme dark:hover:bg-background-primary focus:outline-none transition-all duration-300">
                                            <svg className="h-5 w-5 text-main-theme  " fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <RelatedProducts products={relatedProducts} />
                        </div>
                    </main>
                </div>
            )}
        </>
    );
}
