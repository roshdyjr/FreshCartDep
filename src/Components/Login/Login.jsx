import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Contexts/AuthContext';
import { ThemeContext } from './../../Contexts/ThemeContext';
import { Helmet } from "react-helmet-async";

const Login = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    let { setUserToken } = useContext(AuthContext);
    const { isDarkMode } = useContext(ThemeContext);

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be minimum eight characters, at least one letter, one number and one special character"),
    });

    const initialValues = {
        "email": "",
        "password": "",
    };

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    async function onSubmit() {
        setErrorMsg("");
        setIsLoading(true);
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
            setIsLoading(false);
            setUserToken(data.token);
            localStorage.setItem("token", data.token);
            if (location.pathname === "/login") {
                navigate("/");
            } else {
                navigate(location.pathname);
            }
        }).catch((err) => {
            setIsLoading(false);
            setErrorMsg(err.response.data.message);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full py-20 px-5">
            <Helmet>
                <title>FreshCart - Login</title>
            </Helmet>
            <div className=" flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
            </div>
            <div
                className={`xl:max-w-3xl ${isDarkMode ? "bg-background-primary" : "bg-white"} w-full p-5 sm:p-10 rounded-md`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
                >
                    Welcome to Fresh Cart
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
                            placeholder="Enter your email"
                        />
                        {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline ${darkMode ? "bg-[#302E30] text-white focus:border-white" : "bg-gray-100 text-black focus:border-black"}`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
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
                            <span className="ml-3">Login {isLoading && <i className="ml-2 fa fa-spinner fa-spin"></i>}</span>
                        </button>
                        {errorMsg && <p className="text-center text-red-500">{errorMsg}</p>}
                    </form>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                        Not registered yet ?{" "}
                        <Link to={"/register"}>
                            <span className="text-main-theme font-semibold">Register</span>
                        </Link>
                    </p>
                    <Link to={"/forgotPassword"} className="block mt-6 text-xs text-gray-600 text-center underline">
                        Forgot your password ?{" "}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
