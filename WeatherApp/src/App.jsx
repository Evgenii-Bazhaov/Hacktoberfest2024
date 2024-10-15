import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search_cities" element={<CityPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

