import "./Result.css";
import { useSelector, useDispatch } from "react-redux";
import NotesSVG from "../../assets/notes.svg";
import TickSVG from "../../assets/tick.svg";
import CrossSVG from "../../assets/cross.svg";
import TotalSVG from "../../assets/total.svg";
import { Button, Collapse } from "reactstrap";
import { useState } from "react";
import QuestionResult from "../QuestionResult/QuestionResult";
import { resetQuestions } from "../../Reducers/questionReducer";
import { setCurrentPage } from "../../Reducers/pageReducer";
import { resetUser } from "../../Reducers/userReducer";

const Result = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const questionInfo = useSelector((state) => state.question);
  const [isOpenWrong, setIsOpenWrong] = useState();
  const [isOpenRight, setIsOpenRight] = useState();

  const handleResetQuiz = () => {
    dispatch(resetQuestions({ totalQuestions: 0 }));
    dispatch(resetUser());
    dispatch(setCurrentPage({ currentPage: "Landing" }));
  };

  return (
    <div className="h-full  flex items-start pt-8 pl-5 flex-col">
      <div className="result_overview w-full">
        <div className="flex flex-row justify-between ">
          <div className="flex items-start justify-center flex-row">
            <div className="notes_svg h-full ">
              <img src={NotesSVG} alt="Trophy SVG"></img>
            </div>
            <div className="text-5xl ml-6 h-full flex items-center">
              <div>
                Result for{" "}
                <span className="text-red-700 font-bold">{userInfo.name}</span>
              </div>
            </div>
          </div>
          <div className="mr-6">
            <Button
              color="dark"
              className="mr-2"
              onClick={() =>
                (window.location.href = "https://github.com/singhanuj620")
              }
            >
              ❤️ on Github - Anuj Singh
            </Button>
            <Button color="info" onClick={() => handleResetQuiz()}>
              Restart Quiz
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full flex flex-row justify-around">
        <div className="flex flex-row justify-center items-center mr-10">
          <div className="count_icon">
            <img src={TotalSVG} alt="tick" />
          </div>
          <div className="flex flex-row justify-center items-center text-xl ml-4">
            <div>
              Total :{" "}
              <span className="font-bold">{questionInfo.totalQuestions}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mr-10">
          <div className="count_icon">
            <img src={TickSVG} alt="tick" />
          </div>
          <div className="flex flex-row justify-center items-center text-xl ml-4">
            <div>
              Right :{" "}
              <span className="font-bold">
                {questionInfo.rightAnswer.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mr-10">
          <div className="count_icon">
            <img src={CrossSVG} alt="tick" />
          </div>
          <div className="flex flex-row justify-center items-center text-xl ml-4">
            <div>
              Wrong :{" "}
              <span className="font-bold">
                {questionInfo.wrongAnswer.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="question_result mt-10 w-full">
        {questionInfo.wrongAnswer.length > 0 && (
          <div className="mr-4">
            <div
              onClick={() => setIsOpenWrong(!isOpenWrong)}
              className="text-xl w-full h-12 bg-orange-200 rounded-lg p-2 cursor-pointer"
            >
              Check Wrong Answers
            </div>
            <Collapse isOpen={isOpenWrong} className="mt-2">
              <QuestionResult
                questionList={questionInfo.wrongAnswer}
                isWrong={true}
              />
            </Collapse>
          </div>
        )}
        {questionInfo.rightAnswer.length > 0 && (
          <div className="mr-4 mt-8 mb-14">
            <div
              onClick={() => setIsOpenRight(!isOpenRight)}
              className="text-xl w-full h-12 bg-orange-200 rounded-lg p-2 cursor-pointer"
            >
              Check Right Answers
            </div>
            <Collapse isOpen={isOpenRight} className="mt-2">
              <QuestionResult questionList={questionInfo.rightAnswer} />
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
