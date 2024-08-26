import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';

export default function Footer() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <footer className={`bg-[#DDD4B5] dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
            <div className="container px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <h1 className={`max-w-lg text-xl font-semibold tracking-tight xl:text-2xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            Subscribe to our newsletter to get updates.
                        </h1>

                        <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                            <input
                                id="email"
                                type="email"
                                className={`px-4 py-2 text-gray-700 ${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-600' : 'bg-white border-gray-300'} border rounded-md focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300`}
                                placeholder="Email Address"
                            />
                            <button className={`w-full px-6 py-2.5 text-sm font-medium tracking-wider transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none ${isDarkMode ? 'bg-main-theme text-white hover:bg-white hover:text-main-theme' : 'text-secondary-theme bg-[#E9522C] hover:bg-white'} rounded-lg focus:ring focus:ring-gray-300 focus:ring-opacity-80`}>
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Quick Link</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Home
                            </a>
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Who We Are
                            </a>
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Our Philosophy
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Industries</p>
                        <div className="flex flex-col items-start mt-5 space-y-2">
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Retail & E-Commerce
                            </a>
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Information Technology
                            </a>
                            <a href="#" className={`transition-colors duration-300 hover:underline ${isDarkMode ? 'text-white hover:text-main-theme' : 'text-secondary-theme hover:text-main-theme'}`}>
                                Finance & Insurance
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700" />

                <div className="flex items-center justify-between">
                    <i className="fas fa-shopping-cart text-main-theme text-4xl"></i>

                    <div className="flex -mx-2">
                        <a href="#" className={`mx-2 text-main-theme transition-colors duration-300 ${isDarkMode ? `hover:text-white` : `hover:text-black`}`} aria-label="Reddit">
                            <i className="fab fa-reddit text-xl"></i>
                        </a>
                        <a href="#" className={`mx-2 text-main-theme transition-colors duration-300 ${isDarkMode ? `hover:text-white` : `hover:text-black`}`} aria-label="Facebook">
                            <i className="fab fa-facebook-f text-xl"></i>
                        </a>
                        <a href="#" className={`mx-2 text-main-theme transition-colors duration-300 ${isDarkMode ? `hover:text-white` : `hover:text-black`}`} aria-label="Github">
                            <i className="fab fa-github text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
