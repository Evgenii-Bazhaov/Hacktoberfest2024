import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { logout } from '../services/authApi';

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-around my-5'>
        <Link to="/" className='font-bold text-richblue-800 underline'>CHAT APPLICATION</Link>
        <div>

            {
                !token && 
                <div className='flex gap-5'> 
                    <button className='hover:font-semibold'>
                        <Link to='/login'>Login</Link>
                    </button>
                    <button className='hover:font-semibold'>
                        <Link to='/signup'>Signup</Link>
                    </button>
                </div>
            }
            {
                token &&
                <>
                    <button className='hover:font-semibold' onClick={() => dispatch(logout(navigate))}>Logout</button>
                </>
            }
        </div>
    </div>
  )
}

export default Navbar