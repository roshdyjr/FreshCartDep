import React, { useContext } from 'react';
import { ThemeContext } from '../../Contexts/ThemeContext';

const DarkModeToggler = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-background-secondary' : 'bg-background-primary'}`}
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? (
                <svg className="w-6 h-6 text-secondary-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v1m0 16v1m-7-7h1m16 0h1m-6-6l.707.707m-8.414 0L4.343 9m16.97 0l.707-.707m-8.414 0L15.656 9m-1.707-7.707a10 10 0 00-2.268 18.061A10.001 10.001 0 0012 21a10 10 0 000-18z" />
                </svg>
            ) : (
                <svg className="w-6 h-6 text-main-theme" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v1m0 16v1m-7-7h1m16 0h1m-6-6l.707.707m-8.414 0L4.343 9m16.97 0l.707-.707m-8.414 0L15.656 9m-1.707-7.707a10 10 0 00-2.268 18.061A10.001 10.001 0 0012 21a10 10 0 000-18z" />
                </svg>
            )}
        </button>
    );
};

export default DarkModeToggler;
