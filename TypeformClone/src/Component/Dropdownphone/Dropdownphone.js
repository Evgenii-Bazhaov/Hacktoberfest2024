import React, { useState } from 'react';
import './Dropdownphone.css';
import Dropdownlist from '../Dropdownlist/Dropdownlist'

const Dropdownphone = ({ countryCode, countryPhoneNumber, handleDropdownResponse, countryName }) => {
    const [currentValue, setCurrentValue] = useState()
    const [isDropdownSelected, setIsDropdownSelected] = useState(false)
    const [dropdownOptions, setDropdownOptions] = useState(countryCode)


    const handleDropdownClick = (value) => {
        setIsDropdownSelected(false)
        setCurrentValue(value)
        handleDropdownResponse({ value })
    }

    const fetchResponse = (e) => {
        e.preventDefault()
        if (e.target.value === "") {
            setIsDropdownSelected(false)
        }
        else {
            setIsDropdownSelected(true)
        }
        setCurrentValue(e.target.value)
        let newOptions = []
        if (e.target.value === "") {
            newOptions = countryCode
        }
        else {
            dropdownOptions.forEach(element => {
                if ((element.toLowerCase()).includes((e.target.value).toLowerCase())) {
                    newOptions.push(element)
                }
            });
        }
        setDropdownOptions(newOptions)
    }

    return (
        <div>
            <div className='dropdownphone-div'>
                <input className="dropdown-value" placeholder={"Country Name"} type="text" onChange={(e) => fetchResponse(e)} onClick={() => setIsDropdownSelected(!isDropdownSelected)} value={currentValue}>
                </input>
            </div>
            {isDropdownSelected && <div className='dropdown-div dropdownphone-option-div'>
                {dropdownOptions.map((value, ind) => <div className='dropdownphone-option-container'>
                    <Dropdownlist key={ind} value={value} handleClick={handleDropdownClick} flag={true} countryPhoneNumber={countryPhoneNumber[value]} countryName={countryName[value]} />
                </div>
                )}
            </div>}
        </div>
    )
}

export default Dropdownphone