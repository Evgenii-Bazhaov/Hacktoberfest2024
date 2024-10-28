import React from 'react'
import { useSelector } from "react-redux"
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Template = ({heading, formType}) => {
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className='flex justify-center items-center mt-48'>
      {
        loading ? (<div className="spinner"></div>) : 
        (
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
              <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-black'>{heading}</h1>
              {formType === 'Signup' ? <SignupForm/>: <LoginForm/>}
          </div>
       
        )
      }

    </div>
  )
}

export default Template;