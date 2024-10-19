import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-9/12 mx-auto mt-20'>
        <p className='font-edu-sa text-xl'>Welcome to our real-time chat application! Connect with friends, family, and colleagues instantly, no matter where they are in the world. With our secure and intuitive platform, chatting has never been easier. Sign up now to start chatting with your contacts in real-time using our MERN stack-based application with Socket.IO integration. Stay connected, stay in touch, and experience the power of instant communication like never before!</p>
        <div className='flex justify-center gap-5 mt-10 text-lg'>
          <Link className='rounded-[8px] bg-yellow-50 py-[8px] px-[12px] hover:font-semibold' to='/login'>Login</Link>
          <Link className='rounded-[8px] bg-yellow-50 py-[8px] px-[12px] hover:font-semibold' to='/signup'>Signup</Link>
        </div>
    </div>
  )
}

export default Home