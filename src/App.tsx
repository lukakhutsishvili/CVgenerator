import { Route, Routes } from "react-router-dom";
import PersonalInfo from "./pages/PersonalInfo";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Home from "./pages/Home";
import { createContext, useState, Dispatch, SetStateAction } from "react";

export type CvData = {
  position?: string;
  employer?: string;
  startingDate?: string;
  finishingDate?: string;
  description?: string;
}[];
export type PersonaInfoCvData = {
  name?: string;
  surname?: string;
  about?: string;
};

interface CvContextType {
  experienceCv: CvData;
  setExperienceCv: Dispatch<SetStateAction<CvData>>;
  personalInfoCv: PersonaInfoCvData;
  setPersonalInfoCv: Dispatch<SetStateAction<PersonaInfoCvData>>;
}

export const CvContext = createContext<CvContextType>({
  experienceCv: [],
  setExperienceCv: () => {},
  personalInfoCv: {},
  setPersonalInfoCv: () => {},
});

function App() {
  const [experienceCv, setExperienceCv] = useState<CvData>([
    {
      position: "",
      employer: "",
      startingDate: "",
      finishingDate: "",
      description: "",
    },
  ]);
  const [personalInfoCv, setPersonalInfoCv] = useState<PersonaInfoCvData>({});

  return (
    <CvContext.Provider
      value={{
        experienceCv,
        setExperienceCv,
        personalInfoCv,
        setPersonalInfoCv,
      }}
    >
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/PersonalInfo" element={<PersonalInfo />} />
        <Route path="/Experience" element={<Experience />} />
        <Route path="/Education" element={<Education />} />
      </Routes>
    </CvContext.Provider>
  );
}

export default App;
