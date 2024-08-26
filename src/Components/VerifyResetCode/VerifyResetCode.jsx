import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import { ThemeContext } from './../../Contexts/ThemeContext';
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        resetCode: Yup.string().required("Reset Code is Required")
    });

    const initialValues = {
        resetCode: ""
    };

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit(values) {
        setIsLoading(true);
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
                resetCode: values.resetCode
            });
            console.log(data);
            if (data.status) {
                navigate('/resetPassword', { state: { successMsg: "Reset code verified successfully" } });
            } else {
                setError(data.message || "Failed to verify reset code");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-20 px-5">
            <Helmet>
                <title>FreshCart - Reset Code</title>
            </Helmet>
            <div className={`xl:max-w-3xl ${isDarkMode ? "bg-background-primary" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}>
                <h1 className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                    Reset Code
                </h1>
                <div className="w-full mt-8">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${isDarkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.resetCode}
                            name="resetCode"
                            type="text"
                            placeholder="Enter the code"
                        />
                        {touched.resetCode && errors.resetCode && <p className="text-red-500">{errors.resetCode}</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        <button type="submit" disabled={isLoading} className="disabled:bg-[#282D2D] mt-5 tracking-wide font-semibold bg-main-theme text-gray-100 w-full py-4 rounded-lg hover:bg-main-theme/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <path d="M20 8v6M23 11h-6" />
                            </svg>
                            <span className="ml-3">Verify Reset Code{isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

