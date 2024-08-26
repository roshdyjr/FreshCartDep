
import React from 'react';

const NoProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
      <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M3 21L21 3" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-700">No Products Found</h2>
      <p className="mt-2 text-gray-500">It looks like there are no products available in this category. Please check back later or explore other categories.</p>
    </div>
  );
};

export default NoProducts;
