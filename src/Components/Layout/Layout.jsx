import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navbar />
      <div className='py-32 px-8 container mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
