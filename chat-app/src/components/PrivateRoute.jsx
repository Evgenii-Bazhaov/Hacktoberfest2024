import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {token} = useSelector((state) => state.auth);
    if(token !== null)
        return children;
    else
        return <Navigate to='/login'/>
}

export default PrivateRoute