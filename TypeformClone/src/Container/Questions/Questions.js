import React, { useState } from 'react'
import './Questions.css'
import { questions } from '../../questions'
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../Component/Input/Input'
import Button from '../../Component/Button/Button'
import Dropdown from '../../Component/Dropdown/Dropdown'
import { setQuestionNumber, setScreen } from '../../slice/changeScreenSlice';
import { setAnswer } from '../../slice/answerSlice';
import Options from '../../Component/Options/Options'
import Phone from '../../Component/Phone/Phone'
import Progressbar from '../../Component/Progressbar/Progressbar'
import { formValidation } from '../../Utilities/formValidation';

const Questions = () => {
    const { questionNumber } = useSelector((state) => state.screen);
    const answer = useSelector((state) => state.answer);
    const question = questions.filter(question => question.id === questionNumber)[0];
    const dispatch = useDispatch();

    const [inputField, setInputField] = useState("");
    const [dropdownResponse, setDropdownResponse] = useState("");
    const [optionResponse, setOptionResponse] = useState([]);
    const [phoneResponse, setPhoneResponse] = useState();
    const [errorOccured, setErrorOccured] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const handleInputResponse = (e) => {
        e.preventDefault();
        setInputField(e.target.value);
    }

    const handleDropdownResponse = ({ value }) => {
        setDropdownResponse(value)
    }

    const handleOptionResponse = (option) => {
        setOptionResponse(option)
    }

    const handlePhoneResponse = (value) => {
        setPhoneResponse(value)
    }

    const answerJSX = (type) => {
        switch (type) {
            case "input": return <Input placeholder={question.placeholder} handleInputResponse={handleInputResponse} value={inputField} />
            case "email": return <Input placeholder={question.placeholder} handleInputResponse={handleInputResponse} value={inputField} />
            case "dropdown": return <Dropdown options={question.dropdownOptions} placeholder={question.placeholder} handleDropdownResponse={handleDropdownResponse} />
            case "option": return <Options options={question.options} handleOptionResponse={handleOptionResponse} optionLimit={question.optionLimit} />
            case "phone": return <Phone countryCode={question.countryCode} countryPhoneNumber={question.countryPhoneNumber} inputPlaceholder={question.placeholder} handlePhoneResponse={handlePhoneResponse} countryName={question.countryName} />
            default: return <div></div>
        }
    }

    const handleStoreAnswer = () => {
        switch (question.type) {
            case "input":
                if (formValidation({ type: question.type, isRequired: question.isRequired, value: inputField })) {
                    dispatch(setAnswer({ questionId: question.id, answer: inputField }))
                    setErrorOccured(false)
                    dispatch(setQuestionNumber({ number: question.id + 1 }))
                }
                else {
                    setErrorOccured(true)
                    setErrorMsg("Please enter valid name")
                }
                setInputField("")
                break
            case "email":
                if (formValidation({ type: question.type, isRequired: question.isRequired, value: inputField })) {
                    dispatch(setAnswer({ questionId: question.id, answer: inputField }))
                    setErrorOccured(false)
                    dispatch(setQuestionNumber({ number: question.id + 1 }))
                }
                else {
                    setErrorOccured(true)
                    setErrorMsg("Please enter valid email")
                }
                setInputField("")
                break
            case "dropdown":
                // dropdown form validation
                if (formValidation({ type: question.type, isRequired: question.isRequired, value: dropdownResponse, dropdownoptions: question.dropdownOptions })) {
                    dispatch(setAnswer({ questionId: question.id, answer: dropdownResponse }))
                    setDropdownResponse("")
                    setErrorOccured(false)
                    dispatch(setQuestionNumber({ number: question.id + 1 }))
                }
                else {
                    setErrorOccured(true)
                    setErrorMsg("Select valid dropdown option")
                }
                break
            case "option":
                // option form validation
                if (formValidation({ type: question.type, isRequired: question.isRequired, value: optionResponse, options: question.options, optionLimit: question.optionLimit })) {
                    dispatch(setAnswer({ questionId: question.id, answer: optionResponse }))
                    setErrorOccured(false)
                    dispatch(setQuestionNumber({ number: question.id + 1 }))
                }
                else {
                    setErrorOccured(true)
                    setErrorMsg("Select valid option(s)")
                }
                setOptionResponse([])
                break
            case "phone":
                // phone validation
                if (formValidation({ type: question.type, isRequired: question.isRequired, value: phoneResponse })) {
                    setErrorOccured(false)
                    dispatch(setAnswer({ questionId: question.id, answer: phoneResponse }))
                    setPhoneResponse()
                    dispatch(setScreen({ screenName: "thankyou" }))
                }
                else {
                    setErrorOccured(true)
                    setErrorMsg("Enter valid phone number")
                }

                break
            default: { }
        }
    }

    const findReplacedWord = (id) => {
        return answer.filter(ans => ans.id === id)[0].answer
    }

    const renderQuestionTitle = () => {
        if (!question.title.isDynamic) {
            return question.title.text
        }
        let newTitle = question.title.text
        question.title.dependentValue.forEach(({ questionId, word }) => {
            newTitle = newTitle.replace(word, findReplacedWord(questionId))
        })
        return newTitle
    }

    const resetError = () => {
        setErrorOccured(false)
        setErrorMsg("")
    }

    return (
        <div className='ques'>
            <Progressbar questionNumber={question.id} />
            <div className='ques-title'>
                {questionNumber} &nbsp;
                <svg className="svg-ques" viewBox="0 0 20 20">
                    <path fill="none" d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
	l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
	c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
	c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
	S1.293,9.212,1.729,9.212z"></path>
                </svg>
                &nbsp; &nbsp;
                {renderQuestionTitle()}
                {question.isRequired && ' *'}
            </div>
            <div className={question.title.subText ? `ques-sub-title` : ''}>{question.title.subText && question.title.subText}</div>
            <div className={question.type === "option" ? `ques-sub-title` : ''}>{question.type === "option" && `Choose ${question.optionLimit} option`}</div>
            <div className="ans">{errorOccured ? <div className="error-div">{errorMsg} &nbsp; <Button text="Retry" onClick={() => resetError()} /></div> : answerJSX(question.type)}</div>
            <div className="ques-btn">
                {!errorOccured && <div><Button text={question.lastQuestion ? "Submit" : "OK"} onClick={handleStoreAnswer} /></div>}
            </div>
        </div >
    )
}

export default Questions