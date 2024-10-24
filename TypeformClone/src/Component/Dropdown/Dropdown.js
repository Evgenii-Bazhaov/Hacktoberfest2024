import React, { useState } from 'react';
import './Dropdown.css';
import uparrow from '../../Assets/uparrow.svg'
import downarrow from '../../Assets/downarrow.svg'
import Dropdownlist from '../Dropdownlist/Dropdownlist'

const Dropdown = ({ options, placeholder, handleDropdownResponse }) => {
    const [currentValue, setCurrentValue] = useState()
    const [isDropdownSelected, setIsDropdownSelected] = useState(false)
    const [dropdownOptions, setDropdownOptions] = useState(options)

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
            newOptions = options
        }
        dropdownOptions.forEach(element => {
            if ((element.toLowerCase()).includes((e.target.value).toLowerCase())) {
                newOptions.push(element)
            }
        });
        setDropdownOptions(newOptions)
    }

    const handleDropdownClick = (value) => {
        setIsDropdownSelected(false)
        setCurrentValue(value)
        handleDropdownResponse({ value })
    }

    return (
        <div>
            <div className='dropdown-div'>
                <input className="dropdown-value" placeholder={placeholder} type="text" onChange={(e) => fetchResponse(e)} onClick={() => setIsDropdownSelected(!isDropdownSelected)} value={currentValue}>
                </input>
                <div >{isDropdownSelected ? <img src={uparrow} alt="uparrow" className='arrow-icon' /> : <img src={downarrow} alt="downarrow" className='arrow-icon' />}</div>
            </div>
            {isDropdownSelected && <div className='dropdown-div dropdown-option-div'>
                {dropdownOptions.map((value, ind) => <div className='dropdown-option-container'><Dropdownlist key={ind} value={value} handleClick={handleDropdownClick} /></div>)}
            </div>}
        </div>
    )
}

export default Dropdown