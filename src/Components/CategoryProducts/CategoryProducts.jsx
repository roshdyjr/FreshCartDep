import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import NoProducts from '../NoProducts/NoProducts';
import { Helmet } from 'react-helmet-async';

export default function CategoryProducts() {
  let { id } = useParams();

  function getCategoryProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products", {
      params: { category: id }
    });
  }

  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['categoryProducts', id],
    queryFn: getCategoryProducts,
    staleTime: 3000,
    refetchInterval: 3000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    select: (data) => data.data.data
  });

  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: getCategory,
    staleTime: 3000,
    refetchInterval: 3000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    select: (data) => data.data.data
  });

  if (productsLoading || categoryLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {productsData.length === 0 ? (
        <NoProducts />
      ) : (
        <div>
          {categoryData && (
            <>
              <h1 className='text-2xl text-center font-bold text-main-theme dark:text-secondary-theme'>
                {categoryData.name}
              </h1>
              <img
                className="rounded-t-lg p-8 w-full h-96 object-contain"
                src={categoryData.image}
                alt={categoryData.name}
              />
            </>
          )}
          <h2 className="text-2xl font-bold text-center text-main-theme dark:text-secondary-theme">
            Products in this Category
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
