import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from "../../Contexts/ThemeContext";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const { isDarkMode } = useContext(ThemeContext);

    const navigate = useNavigate();


    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name length must be more than 2 characters").max(20, "Name length must be less than 20 characters"),
        email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be minimum eight characters, at least one letter, one number and one special character"),
        rePassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Passwords don't match"),
        phone: Yup.string().required("Phone number is required").matches(/^01[0-2,5]{1}[0-9]{8}$/, "Please enter an Egyptian phone number")
    });

    const initialValues = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    };

    const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit() {
        setSuccessMsg("");
        setErrorMsg("");
        setIsLoading(true);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({ data }) => {
            setIsLoading(false);
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        }).catch((err) => {
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        })
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-16 px-5">
            <Helmet>
                <title>FreshCart</title>
            </Helmet>
            <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
            </div>
            <div className={`xl:max-w-3xl w-full p-5 sm:p-10 rounded-md ${isDarkMode ? "bg-background-primary" : "bg-white"}`}>
                <h1 className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                    Welcome to Fresh Cart
                </h1>
                <div className="w-full mt-8">
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-secondary-theme text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                        {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-secondary-theme text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-secondary-theme text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-secondary-theme text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rePassword}
                            name="rePassword"
                            type="password"
                            placeholder="Confirm password"
                        />
                        {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-secondary-theme text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone"
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
                            <span className="ml-3">Register {isLoading && <i className="fa fa-spinner fa-spin"></i>}</span>
                        </button>
                        {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
                        {successMsg && <p className="text-center text-green-500">{successMsg}</p>}
                    </form>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-main-theme">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
