import "./SingleQuestion.css";
import { useState, useEffect } from "react";

const SingleQuestion = ({
  questionData = {
    question: "Javascript follows _ programming paradigm.",
    options: [
      {
        id: 1,
        value: "Prototype",
        correct: true,
      },
      {
        id: 2,
        value: "OOPS",
      },
      {
        id: 3,
        value: "Functional",
      },
    ],
  },
  handleSelectedAnswer,
}) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState();
  useEffect(() => {
    if (selectedAnswerId) {
      document.getElementById(selectedAnswerId).removeAttribute("style");
    }
    setSelectedAnswerId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData]);

  const handleOptionClick = (id) => {
    if (selectedAnswerId) {
      document.getElementById(selectedAnswerId).removeAttribute("style");
    }
    document.getElementById(id).style.backgroundColor = "lightgreen";
    document.getElementById(id).style.fontWeight = "bold";
    setSelectedAnswerId(id);
    handleSelectedAnswer(id);
  };

  const { question, options } = questionData;
  return (
    <div className="flex flex-col">
      <div className="question_title">
        {question.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="option_container flex flex-wrap">
        {options.map((option, ind) => {
          return (
            <div
              key={ind}
              className="option"
              id={option.id}
              onClick={() => handleOptionClick(option.id)}
            >
              {option.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleQuestion;
