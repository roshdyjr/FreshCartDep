import React from 'react';

export default function CategoriesLead() {
  return (
    <div className="relative text-secondary-theme bg-main-theme py-12 px-6 md:px-12 rounded-lg shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-main-theme to-background-secondary opacity-80"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-background-primary">
          Discover Our Categories
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white dark:text-background-primary">
          Dive into our extensive collection of products, tailored to suit every taste and need. Explore and find what suits you best!
        </p>
      </div>
    </div>
  );
}
