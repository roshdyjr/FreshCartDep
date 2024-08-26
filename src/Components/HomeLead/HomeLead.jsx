import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import freshCartImg from '../../assets/shopping.jpg';
import categoriesImg from '../../assets/categories.jpeg';
import brandsImg from '../../assets/brands.webp';

export default function HomeLead() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                <div className="relative h-60 md:h-80 lg:h-96">
                    <img src={freshCartImg} alt="products" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Welcome to FreshCart!</h2>
                        <p className="text-xl font-bold mb-6">Discover our latest products</p>
                        <a href="/products" className="bg-main-theme text-secondary-theme px-6 py-2 rounded-lg font-semibold hover:bg-secondary-theme hover:text-main-theme transition-all duration-300">Shop Now</a>
                    </div>
                </div>
                <div className="relative h-60 md:h-80 lg:h-96">
                    <img src={categoriesImg} alt="categories" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Check out our various categories</h2>
                        <p className="text-lg mb-6">Explore our diverse range of products</p>
                        <a href="/products" className="bg-main-theme text-secondary-theme px-6 py-2 rounded-lg font-semibold hover:bg-secondary-theme hover:text-main-theme transition-all duration-300">Shop Now</a>
                    </div>
                </div>
                <div className="relative h-60 md:h-80 lg:h-96">
                    <img src={brandsImg} alt="brands" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white text-center p-4">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Popular Brands</h2>
                        <p className="text-lg mb-6">Don’t miss out on the best brands!</p>
                        <a href="/products" className="bg-main-theme text-secondary-theme px-6 py-2 rounded-lg font-semibold hover:bg-secondary-theme hover:text-main-theme transition-all duration-300">Shop Now</a>
                    </div>
                </div>
            </Slider>
        </div>
    );
}
