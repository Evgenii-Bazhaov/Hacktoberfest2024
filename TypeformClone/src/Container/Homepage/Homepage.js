import React, { useEffect } from 'react'
import './Homepage.css'
import Button from '../../Component/Button/Button'
import { useDispatch } from 'react-redux';
import { setScreen, setQuestionNumber } from '../../slice/changeScreenSlice';

const Homepage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleStart();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStart = () => {
        dispatch(setScreen({ screenName: "questions" }))
        dispatch(setQuestionNumber({ number: 1 }))
    }

    return (
        <div className="homepage">
            <div className="heading homepage-heading">Up-skilling requires time commitment</div>
            <div className="sub-heading homepage-subheading">The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work in.
                <br></br>
                <br></br>
                You will spend
                <br></br>
                - 6 hours/week for the first 5 weeks
                <br></br>
                - 15 hours/week for the last 3 weeks
            </div>
            <div className="homepage-btn">
                <div><Button text={"I agree"} onClick={handleStart} /></div>
                <div> &nbsp; &nbsp; press <strong>Enter</strong> ↵</div>
            </div>
        </div>
    )
}

export default Homepage