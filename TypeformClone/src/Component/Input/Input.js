import React from 'react'
import './Input.css'

const Input = ({ placeholder, handleInputResponse, value, type }) => {
    return (
        <div className="input-div">
            <input type={type ? type : "text"} className={type === "number" ? "inp-number" : "inp"} placeholder={placeholder} value={value} onChange={(e) => handleInputResponse(e)}></input>
        </div>
    )
}

export default Input