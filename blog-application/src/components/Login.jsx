import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/operations/userApi"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[formData, setFormData] = useState({
        content:"",
        password:""
    })
    const[showPassword, setShowPassword] = useState(false);
    const { content, password } = formData
    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(content, password, navigate))
    }
    
  return (
    <div>
        <form className='flex mt-48 w-1/3 mx-auto flex-col gap-y-4' onSubmit={submitHandler}>
            <label className="w-full">
                <p className="mb-1 text-xl leading-[1.375rem] text-black font-semibold">
                Username/Email <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="content"
                    value={content}
                    onChange={changeHandler}
                    placeholder="Enter your username or email"
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
                className="mt-6 rounded-[8px] bg-black py-[8px] px-[12px] font-medium text-white"
            >
                Sign In
            </button>
            <span>Don't have an account  <Link to='/signup' className='text-cyan-600'>Signup?</Link></span>

            
        </form>
    </div>
  )
}

export default Login;
