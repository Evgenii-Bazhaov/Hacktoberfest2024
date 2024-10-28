import React, { useEffect, useState } from 'react'
import './Options.css'
import check from '../../Assets/check.svg';

const Options = ({ options, handleOptionResponse, optionLimit }) => {

    const [optionAnswer, setOptionAnswer] = useState([])
    const [isAnswerCompleted, setIsAnswerCompleted] = useState(false)

    const isOptionSelected = (option) => {
        if (optionAnswer.filter(item => item === option).length === 1) {
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        setOptionAnswer([])
        setIsAnswerCompleted(false)
    }, [options])

    const handleOnClick = (option) => {
        const isOptionAlreadySelected = optionAnswer.filter(item => item === option).length === 1
        if (isOptionAlreadySelected) {
            let newOption = [...optionAnswer]
            let index = newOption.indexOf(option);
            if (index > -1) {
                newOption.splice(index, 1);
            }
            setOptionAnswer(newOption)
        }
        else {
            if (optionAnswer.length < optionLimit) {
                setOptionAnswer([...optionAnswer, option])
            }
        }
    }

    useEffect(() => {
        if (optionAnswer.length === optionLimit) {
            setIsAnswerCompleted(true)
            handleOptionResponse(optionAnswer)
        }
        else {
            setIsAnswerCompleted(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionAnswer])

    return <div className="option-div">
        {options.map((option, ind) =>
            <div className={`${isOptionSelected(option) ? 'option-value-selected' : ''} option-value ${isAnswerCompleted ? isOptionSelected(option) ? '' : 'option-discarded' : ''}`} key={ind} onClick={() => handleOnClick(option)}>
                <div className="option-row">
                    <div>{option}</div>
                    {isOptionSelected(option) && <div><img src={check} alt="check icon" /></div>}
                </div>
            </div>
        )}
    </div>
}

export default Options