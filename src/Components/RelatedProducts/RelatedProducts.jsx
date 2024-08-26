import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { addProductToCart } from '../../utilities/cartService';

export default function RelatedProducts({ products }) {

    let { isDarkMode } = useContext(ThemeContext);


    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="sm:mt-6 md:mt-16">
            <h3 className="text-main-theme dark:text-secondary-theme text-2xl font-medium mb-4">Related Products</h3>
            <div className="border dark:border-secondary-theme rounded-md">
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div key={index} className="w-full max-w-sm mx-auto p-2 overflow-hidden mt-4">
                            <div className="shadow-2xl rounded-md">
                                <div
                                    className="flex items-end justify-end h-56 w-full bg-contain bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url(${product.imageCover})` }}
                                    alt={product.title}
                                >
                                    <button onClick={() => addProductToCart(product._id, isDarkMode)} className="p-2 rounded-full bg-background-secondary dark:bg-background-primary text-main-theme mx-5 -mb-4 hover:bg-white dark:hover:bg-white focus:outline-none focus:bg-white transition-all duration-300" aria-label="Add to cart">
                                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="px-5 py-3">
                                    <Link to={"/productDetails/" + product._id}>
                                        <h3 className="text-main-theme dark:text-secondary-theme uppercase line-clamp-1">{product.title}</h3>
                                    </Link>
                                    <span className="text-main-theme dark:text-secondary-theme mt-2">${product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider></div>

        </div>
    );
}
