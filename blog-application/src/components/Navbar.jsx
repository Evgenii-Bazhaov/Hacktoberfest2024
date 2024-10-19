import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/userApi';

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate()
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 transition-all duration-200`}>
        <div className='w-11/12 flex max-w-maxContent text-puregreys-700 items-center justify-between'>
            <h1 className='font-bold text-3xl'>
                <Link to='/'>
                    BLOGSPHERE
                </Link>
            </h1>
            <div className='flex gap-5'>
                {
                    token === null &&
                    (
                        <Link to='/login'>
                            <button className="rounded-[8px] border border-richblack-700 bg-puregreys-600 px-[8px] py-[8px] text-white">
                                Login
                            </button>
                        </Link>

                    )
                }
                {
                    token === null &&
                    (
                        <Link to='/signup'>
                            <button className="rounded-[8px] border border-richblack-700 bg-puregreys-600 px-[8px] py-[8px] text-white">
                                SignUp
                            </button>
                        </Link>

                    )
                }

                {
                    token !== null &&
                    (
                        <Link to='/create-post'>
                            <button className="rounded-[8px] border border-richblack-700 bg-puregreys-600 px-[8px] py-[8px] text-white">
                                Create a post
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null &&
                    (
                        <Link to='/user-posts'>
                            <button className="rounded-[8px] border border-richblack-700 bg-puregreys-600 px-[8px] py-[8px] text-white">
                                Your Posts
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null &&
                    (
                        
                        <button className="rounded-[8px] border border-richblack-700 bg-puregreys-600 px-[8px] py-[8px] text-white" onClick={() => {dispatch(logout(navigate))}}>
                            Logout
                        </button>
                        
                    )
                }

            </div>
        </div>

    </div>
  )
}

export default Navbar
