import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import { ThemeContext } from './../../Contexts/ThemeContext';
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const successMsg = state?.successMsg;
    const [isLoading, setIsLoading] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const [message, setMessage] = useState();

    const [isPasswordReset, setIsPasswordReset] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        newPassword: Yup.string().required("Please Enter Your New Password"),
    });

    const initialValues = {
        email: "",
        newPassword: ""
    };

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit(values) {
        setIsLoading(true);
        try {
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
                email: values.email,
                newPassword: values.newPassword
            });
            setIsLoading(false);
            if (data.token) {
                setMessage("Password Changed Successfully");
                setIsPasswordReset(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage("Failed to change password. Please try again.");
            }
        } catch (err) {
            console.error("An error occurred", err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!successMsg && !isPasswordReset) {
            navigate('/login');
        }
    }, [successMsg, navigate, isPasswordReset]);

    return (
        <div className="flex flex-col justify-center items-center w-full py-20 px-5">
            <Helmet>
                <title>FreshCart - Reset Password</title>
            </Helmet>
            <div className={`xl:max-w-3xl ${isDarkMode ? "bg-background-primary" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}>
                <h1 className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                    Reset Your Password
                </h1>
                {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}
                <div className="w-full mt-8">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${isDarkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                        />
                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${isDarkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newPassword}
                            name="newPassword"
                            type="password"
                            placeholder="Enter Your New Password"
                        />
                        {message && <p className="text-green-500">{message}</p>}
                        {touched.newPassword && errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
                        <button type="submit" disabled={isLoading} className="disabled:bg-[#282D2D] mt-5 tracking-wide font-semibold bg-main-theme text-gray-100 w-full py-4 rounded-lg hover:bg-main-theme/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Update Your Password{isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
