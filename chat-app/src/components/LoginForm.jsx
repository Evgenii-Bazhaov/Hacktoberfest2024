import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/authApi"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[formData, setFormData] = useState({
        email:"",
        password:""

    })
    const[showPassword, setShowPassword] = useState(false);
    const { email, password } = formData
    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(email, password, navigate))
    }
    
  return (
    <div>
        <form className='mt-6 flex w-full flex-col gap-y-4' onSubmit={submitHandler}>
        <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
            Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
                required
                type="text"
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder="Enter email address"
                className="w-full rounded-lg border p-1"
            />
        </label>
        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
            Password <sup className="text-pink-200">*</sup>
            </p>
            <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={changeHandler}
                placeholder="Enter Password"
                className="rounded-lg border p-1 w-full !pr-12"
            />
            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
                {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </span>
        </label>
        <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
            Sign In
        </button>
        </form>
        
    </div>
  )
}

export default LoginForm;
