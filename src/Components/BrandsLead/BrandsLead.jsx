import React from 'react';

export default function BrandsLead() {
  return (
    <div className="relative text-secondary-theme bg-background-secondary py-12 px-6 md:px-12 rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?fit=crop&w=1500&q=80"
          alt="Brands Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-theme-theme">
          Our Trusted Brands
        </h1>
        <p className="text-lg md:text-xl font-bold mb-6 text-secondary-theme">
          We partner with the best brands in the industry to bring you high-quality products. Discover the brands that define excellence.
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-main-theme"></div>
    </div>
  );
}
