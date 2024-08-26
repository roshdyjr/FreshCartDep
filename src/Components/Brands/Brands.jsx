import React from 'react'
import axios from 'axios';
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Brand from '../Brand/Brand';
import BrandsLead from '../BrandsLead/BrandsLead';
export default function Brands() {

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
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
          <BrandsLead />
          <div className='grid lg:grid-cols-4 gap-10 mt-10 px-6 sm:grid-cols-1 md:grid-cols-2'>
            <Helmet>
              <title>FreshCart - Brands</title>
            </Helmet>
            {data?.map((brand, index) => {
              return <Brand brand={brand} key={index} />
            })}
          </div>
        </div>
      }
    </>
  )
}
