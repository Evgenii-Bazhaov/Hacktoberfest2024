import React from 'react'
import './Dropdownlist.css'

const Dropdownlist = ({ value, handleClick, flag, countryPhoneNumber, countryName }) => {
    return (
        <div className={flag ? "dropphone-value" : "dropoption-value"} onClick={() => { flag ? handleClick(countryPhoneNumber) : handleClick(value) }}>
            {!flag && value}
            {flag && <div>
                <img src={`https://flagcdn.com/16x12/${value.toLowerCase()}.png`} alt={`${value}-phone-code`} width="20" height="12" /> &nbsp; {countryName} &nbsp; +{countryPhoneNumber}
            </div>}
        </div>
    )
}

export default Dropdownlist