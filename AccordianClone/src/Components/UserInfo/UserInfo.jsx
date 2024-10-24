import { useState } from "react";
import "./UserInfo.css";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import InquirySVG from "../../assets/inquiry.svg";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../../Reducers/userReducer";
import { setCurrentPage } from "../../Reducers/pageReducer";

const UserInfo = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [questionBucket, setQuestionBucket] = useState(10);
  const handleUserInfo = () => {
    console.log(questionBucket)
    dispatch(
      setUserDetail({
        name,
        questionBucket: parseInt(questionBucket, 10),
      })
    );
    dispatch(setCurrentPage({ currentPage: "Questions" }));
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="h-full w-full flex justify-center items-start flex-col p-28">
        <div>
          <div className="line_1">Fill out some details : </div>
        </div>
        <div className="pt-12 flex justify-center items-center">
          <Form className="user_form">
            <FormGroup>
              <Label for="username">Full Name</Label>
              <Input
                id="username"
                name="username"
                placeholder="Please enter your full name"
                type="text"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Question Bucket</Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => setQuestionBucket(e.target.value)}
              >
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </Input>
            </FormGroup>
            <Button color="primary" className="mt-12" onClick={handleUserInfo}>
              Start
            </Button>
          </Form>
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <div className="landing_svg">
          <img src={InquirySVG} alt="RankingSVG" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
