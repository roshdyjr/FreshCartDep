import React from 'react';

import { Link } from 'react-router-dom';

export default function Category({ category }) {

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-background-secondary dark:bg-background-primary shadow-md rounded-lg max-w-sm flex flex-col justify-between h-full w-full">
                <div>
                    <img className="rounded-t-lg p-8 w-96 h-96 object-cover hover:scale-105 transition-all duration-300" src={category.image} alt={category.name} />
                </div>
                <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
                    <div>
                        <Link to={"/categoryProducts/" + category._id}>
                            <h3 className="text-secondary-theme dark:text-background-secondary font-semibold text-xl tracking-tight text-center">{category.name}</h3>
                        </Link>
                    </div>
                    <Link to={"/categoryProducts/" + category._id}
                            className="mt-4 text-secondary-theme bg-main-theme hover:bg-white focus:ring-4 focus:ring-secondary-theme font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:hover:bg-white dark:hover:text-main-theme dark:focus:ring-background-secondary transition-all duration-300"
                        >
                            See All Products
                        </Link>
                </div>
            </div>
        </div>
    );
}
