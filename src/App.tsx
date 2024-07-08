import { Route, Routes } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/PersonalInfo" element={<PersonalInfo />} />
      <Route path="/Experience" element={<Experience />} />
      <Route path="/Education" element={<Education />} />
    </Routes>
  );
}

export default App;
