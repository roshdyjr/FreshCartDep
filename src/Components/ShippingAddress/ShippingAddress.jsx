import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import { ThemeContext } from './../../Contexts/ThemeContext';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ShippingAddress = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    const { cartId } = useParams();

    const validationSchema = Yup.object({
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone is required"),
        details: Yup.string().required("Details is required"),
    });

    const initialValues = {
        "city": "",
        "phone": "",
        "details": ""
    };

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit() {
        setIsLoading(true);
        console.log(values)
        await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, { shippingAddress: values },
            {
                headers: {
                    token: localStorage.getItem("token")
                },
                params: {
                    url: 'http://localhost:5173'
                }
            }
        ).then(({ data }) => {
            setIsLoading(false);
            location.href = data.session.url;
        }).catch((err) => {
            setIsLoading(false);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-20 px-5">
            <Helmet>
                <title>FreshCart - Address</title>
            </Helmet>
            <div className=" flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
            </div>
            <div
                className={`xl:max-w-3xl ${isDarkMode ? "bg-background-primary" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
                >
                    Add your shipping address
                </h1>
                <div className="w-full mt-8">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            name="city"
                            type="text"
                            placeholder="Enter Your City"
                        />
                        {touched.city && errors.city && <p className="text-red-500">{errors.city}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.details}
                            name="details"
                            type="text"
                            placeholder="Enter Your Details"
                        />
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            name="phone"
                            type="tel"
                            placeholder="Enter Your Phone"
                        />
                        {touched.phone && errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        <button type="submit" disabled={isLoading} className="disabled:bg-[#282D2D] mt-5 tracking-wide font-semibold bg-main-theme text-gray-100 w-full py-4 rounded-lg hover:bg-main-theme/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg
                                className="w-6 h-6 -ml-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Checkout{isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddress;
