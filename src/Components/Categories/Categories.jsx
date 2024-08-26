import React from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet-async'
import Category from '../Category/Category';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CategoriesLead from '../CategoriesLead/CategoriesLead';

export default function Categories() {

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 3000,
    refetchInterval: 3000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    gcTime: 10000,
    select: (data) => data.data.data
  })


  return (
    <>
      {isLoading ? <LoadingScreen /> :
        <div>
          <CategoriesLead />
          <div className='grid lg:grid-cols-4 gap-10 mt-10 px-6 sm:grid-cols-1 md:grid-cols-2'>
            <Helmet>
              <title>FreshCart - Categories</title>
            </Helmet>
            {data?.map((category, index) => {
              return <Category category={category} key={index} />
            })}
          </div>
        </div>
      }
    </>
  )
}
