import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Product from '../Product/Product';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet-async';

async function fetchAllProducts() {
    let allProducts = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=40`);
        allProducts = [...allProducts, ...data.data.data];
        totalPages = data.data.metadata.numberOfPages;
        page++;
    }

    return allProducts;
}

export default function ProductsUI({ title, page, setPage, limit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        async function fetchAllData() {
            const products = await fetchAllProducts();
            setAllProducts(products);
        }

        fetchAllData();
    }, []);

    const { data, isLoading } = useQuery({
        queryKey: ['products', page, limit],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${limit}`),
        staleTime: 3000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,
        select: (data) => ({
            products: data.data.data,
            totalPages: data.data.metadata.numberOfPages,
        }),
    });

    function handlePageChange(pageNumber) {
        setPage(pageNumber);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            {isLoading && allProducts.length === 0 ? (
                <LoadingScreen />
            ) : (
                <div className='container mx-auto mt-6'>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <div className="mb-4 w-1/2 mx-auto">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className='grid lg:grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-2'>
                        {(searchTerm ? filteredProducts : data?.products)?.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                    {!searchTerm && (
                        <div className='flex justify-center mt-6'>
                            <div className='flex space-x-2'>
                                {[...Array(data?.totalPages || 0)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 rounded-md ${page === index + 1
                                            ? 'bg-main-theme text-secondary-theme'
                                            : 'bg-gray-300 text-gray-700 hover:bg-main-theme hover:text-secondary-theme'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
