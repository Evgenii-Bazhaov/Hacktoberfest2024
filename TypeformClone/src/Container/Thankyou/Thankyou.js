import React, { useEffect } from 'react'
import './Thankyou.css'
import { useSelector } from 'react-redux';
import { questions } from '../../questions'

const Thankyou = () => {
    const answer = useSelector((state) => state.answer);

    useEffect(() => {
        console.clear()
        let finalResponse = {}
        questions.forEach((question) => {
            const findAns = answer.filter(ans => ans.id === question.id)[0].answer
            if (question.type === "option") {
                const responseString = findAns.join(",")
                finalResponse[question.ResponseTitle] = responseString
            }
            else {
                finalResponse[question.ResponseTitle] = findAns
            }
        })
        console.log(finalResponse)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="thankyou-div">All done! Thanks for your time. [Check console.log() for result.]</div>
    )
}

export default Thankyou