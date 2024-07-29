import { Navigate, Route, Routes } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Home from "./pages/Home";
import "./index.css";
import LastPage from "./pages/LastPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personalInfo" element={<PersonalInfo />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/education" element={<Education />} />
      <Route path="/finished" element={<LastPage />} />
    </Routes>
  );
}

export default App;
