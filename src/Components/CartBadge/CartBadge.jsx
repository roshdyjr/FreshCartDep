import React from 'react';

export default function CartBadge({ count }) {
    return (
        <span className={`absolute -top-2 -right-2 w-5 h-5 text-center text-white bg-red-600 rounded-full text-xs`}>
            {count > 0 ? count : '0'}
        </span>
    );
}
