import React, { useEffect, useState } from 'react'
import './Phone.css'
import Dropdownphone from '../Dropdownphone/Dropdownphone'
import Input from '../Input/Input'

const Phone = ({ countryCode, inputPlaceholder, countryPhoneNumber, handlePhoneResponse, countryName }) => {
    const [phoneNumber, setPhoneNumber] = useState()
    const [selectedCode, setSelectedCode] = useState()
    const [firstRender, setFirstRender] = useState(true)

    const handleInputResponse = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handleDropdownResponse = ({ value }) => {
        setSelectedCode(value)
    }

    useEffect(() => {
        if (!firstRender) {
            if (selectedCode && phoneNumber && phoneNumber > 0) {

                handlePhoneResponse(`+${selectedCode}-${phoneNumber}`)
            }
        }
        else {
            setFirstRender(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumber, selectedCode])

    return (
        <div className="phone-div">
            <Dropdownphone countryCode={countryCode} countryPhoneNumber={countryPhoneNumber} handleDropdownResponse={handleDropdownResponse} countryName={countryName} />
            <Input placeholder={inputPlaceholder} handleInputResponse={handleInputResponse} type={"number"} />
        </div>
    )
}

export default Phone