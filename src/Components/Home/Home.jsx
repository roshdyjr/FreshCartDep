import React, { useState } from 'react';
import ProductsUI from './../ProductsUI/ProductsUI';
import HomeLead from '../HomeLead/HomeLead';
import PopularCategoriesSlider from '../PopularCategoriesSlider/PopularCategoriesSlider';
import PopularBrandsSlider from '../PopularBrandsSlider/PopularBrandsSlider';

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 24;

  return (
    <div>
      <HomeLead />
      <PopularCategoriesSlider/>
      <PopularBrandsSlider/>
      <ProductsUI
        title="FreshCart"
        page={page}
        setPage={setPage}
        limit={limit}
      />
    </div>

  );
}