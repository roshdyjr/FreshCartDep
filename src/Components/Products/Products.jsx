import React, { useState } from 'react';
import ProductsUI from './../ProductsUI/ProductsUI';
import ProductsLead from '../ProductsLead/ProductsLead';
export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 24;

  return (
    <div>
      <ProductsLead />
      <ProductsUI
        title="FreshCart - Products"
        page={page}
        setPage={setPage}
        limit={limit}
      />
    </div>
  );
}
