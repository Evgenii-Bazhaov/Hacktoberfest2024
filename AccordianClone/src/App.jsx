import { LandingPage, UserInfo, Questions, Result } from "./Components";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const currentPage = useSelector((state) => state.page.currentPage);

  const fetchComponent = () => {
    switch (currentPage) {
      case "Landing":
        return <LandingPage />;
      case "Info":
        return <UserInfo/>
      case "Questions":
        return <Questions/>
      case "Result":
        return <Result/>
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="body">
      {fetchComponent()}
    </div>
  );
};

export default App;
