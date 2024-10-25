import { useEffect, useState } from "react";
import "./Questions.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Progress } from "reactstrap";
import { resetQuestions, submitAnswer } from "../../Reducers/questionReducer";
import { setCurrentPage } from "../../Reducers/pageReducer";
import { resetUser } from "../../Reducers/userReducer";
import SingleQuestion from "../SingleQuestion/SingleQuestion";

const Questions = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const { totalQuestions, questionNumber, questionList } = useSelector(
    (state) => state.question
  );
  const [selectedAnswerId, setSelectedAnswerId] = useState();

  useEffect(() => {
    dispatch(resetQuestions({ totalQuestions: userInfo.questionBucket }));
  }, []);

  const isAnswerCorrect = ({ selectedAnswerId, question }) => {
    const fetchSelectedOptionFromQuestion = question.options.filter(
      (option) => option.id === selectedAnswerId
    )[0];

    if (fetchSelectedOptionFromQuestion.correct === true) {
      return true;
    }
    return false;
  };

  const handleSubmitAnswer = (questionNumber) => {
    dispatch(
      submitAnswer({
        isRightAnswer: isAnswerCorrect({
          selectedAnswerId,
          question: questionList[questionNumber],
        }),
        questionData: questionList[questionNumber],
        selectedAnswer: selectedAnswerId,
      })
    );

    if (questionNumber + 1 === totalQuestions) {
      dispatch(setCurrentPage({ currentPage: "Result" }));
    }
  };

  const handleResetQuiz = () => {
    dispatch(resetQuestions({ totalQuestions: 0 }));
    dispatch(resetUser());
    dispatch(setCurrentPage({ currentPage: "Landing" }));
  };

  return (
    <div className="p-4 h-full">
      <div>
        <div className="navbar">
          <div className="user_name">
            Hello,{" "}
            <span className="text-red-700 font-bold">{userInfo.name} </span>
          </div>
          <div className="navbar_actions">
            <Button
              color="dark"
              className="mr-2"
              onClick={() =>
                (window.location.href = "https://github.com/singhanuj620")
              }
            >
              ❤️ on Github - Anuj Singh
            </Button>
            <Button
              color="warning"
              outline
              className="mr-2"
              onClick={() => handleResetQuiz()}
            >
              Reset Quiz
            </Button>
          </div>
        </div>
        <div>
          <Progress
            animated
            className="my-3"
            value={Math.round((questionNumber / totalQuestions) * 100)}
            color={questionNumber === totalQuestions ? "primary" : "success"}
          >
            {" "}
            {questionNumber} / {userInfo.questionBucket}
          </Progress>
        </div>
      </div>
      <div className="question_container">
        <SingleQuestion
          questionData={questionList[questionNumber - 1]}
          handleSelectedAnswer={setSelectedAnswerId}
        />
      </div>
      <div className="submit_answer flex justify-end mt-2 mr-8">
        <div>
          <Button
            color="primary"
            className="text-lg"
            onClick={() => handleSubmitAnswer(questionNumber - 1)}
          >
            {questionNumber === totalQuestions ? "Submit Quiz" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
