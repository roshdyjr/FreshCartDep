import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Category from '../Category/Category';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function PopularCategoriesSlider() {
    function getCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { data, isLoading } = useQuery({
        queryKey: ['popularCategories'],
        queryFn: getCategories,
        staleTime: 3000,
        refetchInterval: 3000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        select: (data) => data.data.data
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="my-10 px-6">
            <h2 className="text-2xl font-bold text-main-theme mb-4 px">Popular Categories:</h2>
            <Slider {...settings}>
                {data?.map((category) => (
                    <div className='px-2' key={category._id}>
                        <Category category={category} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
