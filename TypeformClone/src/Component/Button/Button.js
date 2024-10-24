import React from 'react'
import './Button.css'

const Button = ({ text, onClick, icon }) => {
    return (
        <div className="button" onClick={() => onClick()}>
            <div className="button-text"><strong>{text}</strong></div>
        </div>
    )
}

export default Button