import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import NoProducts from '../NoProducts/NoProducts';
import { Helmet } from 'react-helmet-async';

export default function BrandProducts() {
    let { id } = useParams();

    function getBrandProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            params: { brand: id }
        });
    }

    function getBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    }

    const { data: productsData, isLoading: productsLoading } = useQuery({
        queryKey: ['brandProducts', id],
        queryFn: getBrandProducts,
        staleTime: 3000,
        refetchInterval: 3000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        select: (data) => data.data.data
    });

    const { data: brandData, isLoading: brandLoading } = useQuery({
        queryKey: ['brand', id],
        queryFn: getBrand,
        staleTime: 3000,
        refetchInterval: 3000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        select: (data) => data.data.data
    });

    if (productsLoading || brandLoading) {
        return <LoadingScreen />;
    }


    return (
        <div>
            {productsData.length === 0 ? (
                <NoProducts />
            ) : (
                <div>
                    {brandData && (
                        <>
                            <h1 className='text-2xl text-center font-bold text-main-theme dark:text-secondary-theme'>
                                {brandData.name}
                            </h1>
                            <img
                                className="rounded-t-lg p-8 w-full h-96 object-contain"
                                src={brandData.image}
                                alt={brandData.name}
                            />
                        </>
                    )}
                    <h2 className="text-2xl font-bold text-center text-main-theme dark:text-secondary-theme">
                        Products in this Brand
                    </h2>
                    <div className='grid lg:grid-cols-4 gap-3 mt-6 px-6 sm:grid-cols-1 md:grid-cols-2'>
                        <Helmet>
                            <title>FreshCart - Products</title>
                        </Helmet>
                        {productsData.map((product, index) => (
                            <Product product={product} key={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
