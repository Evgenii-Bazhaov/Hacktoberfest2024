import React from 'react'
import './Loader.css'
import logo from '../../../Assets/logo.svg'

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader-img-div">
                <img className="loader-img" src={logo} alt="Logo" />
            </div>
            <div className="loader-horizontal-div">
                <span className="loader-horizontal"></span>
            </div>
        </div>
    )
}

export default Loader