import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Contexts/AuthContext';
import { ThemeContext } from '../../Contexts/ThemeContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import CartBadge from '../CartBadge/CartBadge';
import { fetchCartItemCount } from '../../utilities/cartService';

export default function Navbar() {
    const { userToken, setUserToken } = useContext(AuthContext);
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const { data: cartItemCount = 0 } = useQuery({
        queryKey: ['cartItemCount', userToken],
        queryFn: () => fetchCartItemCount(userToken),
        enabled: !!userToken,
        staleTime: 5000,
        refetchInterval: 2000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    const signOut = () => {
        setUserToken("");
        localStorage.removeItem("token");
        navigate("/login");
    };

    function NavigateToFacebook() {
        window.open("https://www.facebook.com/el3meedgrp", "_blank")
    }

    function NavigateToLinkedIn() {
        window.open("https://www.linkedin.com/in/ahmed-roshdy-572181213/", "_blank")
    }

    function NavigateToGitHub() {
        window.open("https://github.com/roshdyjr?tab=repositories", "_blank")
    }

    return (
        <header className={`w-full fixed overflow-x-hidden z-50 ${isDarkMode ? 'bg-background-primary' : 'bg-background-secondary'}`}>
            <nav className="w-full px-4 py-5">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center flex-shrink-0">
                        <div className="text-white font-bold text-xl flex items-center">
                            <svg className="text-main-theme w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm.176-2l2.553-12.667h-16.145l-.656-3h-2.928v2h1.4l2.568 13.333h10.208zm-8.4-4l1.134-5.667h4.8l-1.134 5.667h-4.8z" />
                            </svg>
                            <Link className="text-main-theme me-8" to="/">FreshCart</Link>
                        </div>
                        {userToken && (
                            <div className="hidden lg:block">
                                <ul className="flex items-center space-x-1 flex-wrap">
                                    <li><NavLink to="/" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Home</NavLink></li>
                                    <li><NavLink to="/products" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Products</NavLink></li>
                                    <li><NavLink to="/categories" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Categories</NavLink></li>
                                    <li><NavLink to="/brands" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Brands</NavLink></li>
                                    <li>
                                        <NavLink to="/cart" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>
                                            Cart
                                        </NavLink>
                                    </li>
                                    <li><NavLink to="/allorders" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Orders</NavLink></li>
                                    <li><NavLink to="/wishlist" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>WishList</NavLink></li>
                                </ul>
                            </div>
                        )}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="outline-none mobile-menu-button"
                                aria-expanded={isOpen}
                            >
                                <svg className="w-6 h-6 main-theme-color inline-block" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center flex-shrink-0">
                        <div className="social-media flex items-center">
                            <i onClick={NavigateToFacebook} className={`fa-brands mx-1 fa-facebook-f cursor-pointer ${isDarkMode ? 'text-white' : 'text-secondary-theme'}`}></i>
                            <i onClick={NavigateToLinkedIn} className={`fa-brands mx-1 fa-linkedin cursor-pointer ${isDarkMode ? 'text-white' : 'text-secondary-theme'}`}></i>
                            <i onClick={NavigateToGitHub} className={`fa-brands mx-1 fa-github cursor-pointer ${isDarkMode ? 'text-white' : 'text-secondary-theme'}`}></i>
                            <NavLink to="/cart" className="relative flex items-center ml-4">
                                <svg className="w-6 h-6 inline-block text-black dark:text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M3 3h2l1 7h10l1-7h2M6 14h12l1 5H5l1-5z"></path>
                                </svg>
                                <CartBadge count={cartItemCount} />
                            </NavLink>
                        </div>
                        <div className="nav-btns">
                            <ul className="flex gap-1">
                                {!userToken ? (
                                    <>
                                        <li><NavLink to="/login" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Login</NavLink></li>
                                        <li><NavLink to="/register" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Register</NavLink></li>
                                    </>
                                ) : (
                                    <li>
                                        <button
                                            onClick={signOut}
                                            className={`block px-1 py-2 font-semibold hover:bg-[#E9522C] hover:text-white rounded-lg transition-all duration-500 ${isDarkMode ? 'text-white' : ''}`}
                                        >
                                            SignOut
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="relative">
                            <DarkModeToggle />
                        </div>
                    </div>
                </div>
                {userToken && (
                    <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
                        <ul className="flex flex-col">
                            <li><NavLink to="/" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Home</NavLink></li>
                            <li><NavLink to="/products" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Products</NavLink></li>
                            <li><NavLink to="/categories" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Categories</NavLink></li>
                            <li><NavLink to="/brands" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Brands</NavLink></li>
                            <li><NavLink to="/cart" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Cart</NavLink></li>
                            <li><NavLink to="/allorders" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>Orders</NavLink></li>
                            <li><NavLink to="/wishlist" className={`block px-1 py-2 ${isDarkMode ? 'text-white' : 'text-secondary-theme'} font-semibold`}>WishList</NavLink></li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
