import React from 'react'
import './Progressbar.css'
import { totalQuestions } from '../../questions';

const Progressbar = ({ questionNumber }) => {

    const calWidth = () => {
        const perQuestionWidth = 99.6 / totalQuestions;
        const newWidth = perQuestionWidth * questionNumber;
        return `${newWidth}%`;
    }

    return (
        <div className="progress" style={{ width: calWidth() }}></div>
    )
}

export default Progressbar