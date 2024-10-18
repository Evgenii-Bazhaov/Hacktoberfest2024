import React, {useState} from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from "../slices/authSlice"
import { signUp } from '../services/authApi';

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const[showPassword, setShowPassword] = useState(false);
    const[showconfirmPassword, setShowconfirmPassword] = useState(false);

    const { firstName, lastName, email, password, confirmPassword } = formData

    function changeHandler(event){
        setFormData((prev) => {
            return{
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    function submitHandler(e){
        e.preventDefault();
        if(password !== confirmPassword){
          toast.error("Passwords Do Not Match")
            return;
        }
        const signupData = {
            ...formData,
        }
        dispatch(signUp(firstName, lastName, email, password, confirmPassword,navigate))
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
    }
    
  return (
    <div>
      {/* Form */}
      <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-16">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
              placeholder="Enter first name"
              className="rounded-lg border p-1 w-full"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
              Last Name
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
              placeholder="Enter last name"
              className="rounded-lg border p-1 w-full"
            />
          </label>
        </div>
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
            className="rounded-lg border p-1 w-full"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={changeHandler}
              placeholder="Enter Password"
              className="rounded-lg border p-1 w-full !pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-800">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showconfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              className="rounded-lg border p-1 w-full !pr-10"
            />
            <span
              onClick={() => setShowconfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showconfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm;