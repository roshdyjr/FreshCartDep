import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductsLead() {
  return (
    <div className="relative bg-gradient-to-r from-main-theme to-background-secondary text-white py-12 px-6 md:px-12 rounded-lg shadow-lg overflow-hidden">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-secondary-theme">
          Discover Our Latest Products
        </h1>
        <p className="text-lg md:text-xl mb-6 dark:text-secondary-theme">
          Find the best deals on your favorite products. Shop now and enjoy exclusive discounts!
        </p>
        <Link
          to="/cart"
          className="bg-main-theme text-white font-semibold rounded-lg px-6 py-3 shadow-lg dark:text-secondary-theme hover:bg-background-secondary transition-all duration-300"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
