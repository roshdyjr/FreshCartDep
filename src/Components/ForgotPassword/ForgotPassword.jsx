import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import { ThemeContext } from './../../Contexts/ThemeContext';
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
    });

    const initialValues = {
        "email": "",
    };

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit(values) {
        setIsLoading(true);
        let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            {
                email: values.email,
            }
        )
        console.log(data)
        setIsLoading(false);
        if (data.statusMsg) {
            setMessage(data.message);
            setTimeout(() => {
                navigate('/verifyResetCode');
            }, 2000);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-20 px-5">
            <Helmet>
                <title>FreshCart - Forgot Password</title>
            </Helmet>
            <div className=" flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
            </div>
            <div
                className={`xl:max-w-3xl ${isDarkMode ? "bg-background-primary" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
                >
                    Forgot Password
                </h1>
                <div className="w-full mt-8">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                        />
                        {message && <p className="text-green-500">{message}</p>}
                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
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
                            <span className="ml-3">Send Reset Code{isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
