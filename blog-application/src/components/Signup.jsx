import React, { useState, useEffect } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkUsername, signup } from "../services/operations/userApi";
import { useDebounce } from 'use-debounce';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { username, email, password, confirmPassword } = formData;

    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    // Debounced username
    const [debouncedUsername] = useDebounce(username, 300);

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (debouncedUsername) {
                setIsCheckingUsername(true);
                setUsernameMessage(''); // Reset the message before checking
                try {
                    const response = await checkUsername(debouncedUsername);
                    if (response && response.data && response.data.success) {
                        setUsernameMessage('Username is available');
                    } else {
                        setUsernameMessage('Username is already taken');
                    }
                } catch (error) {
                    setUsernameMessage('Error checking username availability');
                    console.log("Error: ", error);
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUsernameUnique();
    }, [debouncedUsername]);

    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    function submitHandler(e) {
        e.preventDefault();
        dispatch(signup(username, email, password, confirmPassword, navigate));
    }

    return (
        <div>
            <form className='flex mt-24 w-1/3 mx-auto flex-col gap-y-4' onSubmit={submitHandler}>
                <label className="w-full">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                        Username <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="username"
                        value={username}
                        onChange={changeHandler}
                        placeholder="Enter your username"
                        className="form-style w-full"
                    />
                    {isCheckingUsername && <p>Checking username availability...</p>}
                    {usernameMessage && (
                        <p
                            className={`${
                                usernameMessage === "Username is available"
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {usernameMessage}
                        </p>
                    )}
                </label>
                <label className="w-full">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                        Email <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={changeHandler}
                        placeholder="Enter your email address"
                        className="form-style w-full"
                    />
                </label>
                <label className="relative">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                        Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        className="form-style w-full !pr-10"
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>
                <label className="relative">
                    <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                        Confirm Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={changeHandler}
                        placeholder="Enter Password Again"
                        className="form-style w-full !pr-10"
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
                >
                    Sign In
                </button>
                <span>Already have an account? <Link to='/login' className='text-cyan-600'>Login</Link></span>
            </form>
        </div>
    );
};

export default Signup;
