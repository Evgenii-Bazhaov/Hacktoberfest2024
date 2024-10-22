import "./LandingPage.css";
import RankingSVG from "../../assets/ranking.svg";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../Reducers/pageReducer";

const LandingPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="intro h-full w-full flex justify-center items-start flex-col p-28">
        <div>
          <div className="line_1">Master your</div>
          <div className="line_2">&nbsp; Javascript &nbsp;</div>
          <div className="line_3">by playing a quiz game !!</div>
        </div>
        <div className="get_started_btn pt-24 flex justify-center items-center">
          <div>
            <Button
              color="primary"
              className="text-xl"
              onClick={() => dispatch(setCurrentPage({ currentPage: "Info" }))}
            >
              Get Started
            </Button>
          </div>
          &nbsp; &nbsp; &nbsp;
          <div>
            <Button
              color="dark"
              className="text-xl"
              onClick={() =>
                (window.location.href = "https://github.com/singhanuj620")
              }
            >
              ❤️ on Github - Anuj Singh
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <div className="landing_svg">
          <img src={RankingSVG} alt="RankingSVG" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
