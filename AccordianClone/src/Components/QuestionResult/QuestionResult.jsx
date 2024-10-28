import { Card, CardBody } from "reactstrap";
import "./QuestionResult.css";

const QuestionResult = ({ questionList, isWrong }) => {
  console.log(questionList);
  return (
    <>
      {questionList.map((ques, ind) => {
        return (
          <Card key={ind}>
            <CardBody>
              <div>
                <div className="flex flex-row">
                  <div>{ind + 1}.&nbsp;&nbsp;</div>
                  <div className="font-bold text-lg">{ques.question}</div>
                </div>
                <div className="mt-3">
                  <div>Options :</div>
                  <div className="flex flex-row flex-wrap mt-2">
                    {ques.options.map((option, ind) => {
                      return (
                        <div
                          key={ind}
                          className={`option-result ${
                            option.correct ? "bg-green-500" : ""
                          } ${
                            isWrong && option.id === ques.selectedAnswer
                              ? "bg-red-500"
                              : ""
                          } rounded-lg`}
                        >
                          {option.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default QuestionResult;
