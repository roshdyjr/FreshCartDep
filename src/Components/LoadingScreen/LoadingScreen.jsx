import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h2zm2 5.291l1.414-1.414A8.001 8.001 0 014 12H2a10 10 0 004 8.291z"></path>
        </svg>
        <p className="mt-4 text-lg font-medium text-main-theme">Loading...</p>
      </div>
    </div>
  );
}
