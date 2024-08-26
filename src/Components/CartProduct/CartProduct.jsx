import React, { useContext, useEffect, useState } from 'react'
import { formatPrice } from '../../utilities/PriceFormatter';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { ThemeContext } from './../../Contexts/ThemeContext';

export default function CartProduct({ product, setCart, cart }) {

    const { isDarkMode } = useContext(ThemeContext);
    const [isIncreaseLoading, setIsIncreaseLoading] = useState(false);
    const [isDecreaseLoading, setIsDecreaseLoading] = useState(false);
    const [productCount, setProductCount] = useState(product.count);

    async function removeProductFromCart(productId) {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        setCart(data);
        toast.success('Product Removed successfully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? 'dark' : 'light',
            transition: Bounce,
        });
    }

    async function updateProductCount(productId, count) {
        if (count > product.count) {
            setIsIncreaseLoading(true)
        } else {
            setIsDecreaseLoading(true)
        }
        let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            count
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        setCart(data)
        setIsIncreaseLoading(false);
        setIsDecreaseLoading(false);
    }

    useEffect(() => {
        setProductCount(product.count)
    }, [cart])

    const handleInputChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setProductCount(value);
    };


    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.product.imageCover} alt={product.product.title} className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-secondary-theme">{product.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">{formatPrice(product.price)}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button disabled={product.count == 1 || isDecreaseLoading} onClick={() => updateProductCount(product.product._id, product.count - 1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black hover:text-black hover:bg-main-theme transition-all duration-300"> {isDecreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : `-`} </button>
                        <input onBlur={() => product.count != productCount && updateProductCount(product.product._id, productCount)} onChange={handleInputChange} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={productCount} min="1" max='999' />
                        <button disabled={isIncreaseLoading} onClick={() => updateProductCount(product.product._id, product.count + 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 disabled:cursor-not-allowed hover:text-black hover:bg-main-theme disabled:hover:bg-gray-100 disabled:hover:text-black transition-all duration-300"> {isIncreaseLoading ? <i className='fas fa-spinner fa-spin'></i> : `+`} </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{formatPrice(product.price * product.count)}</p>
                        <svg onClick={() => removeProductFromCart(product.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
