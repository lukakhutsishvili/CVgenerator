import styled from "styled-components";
import { useLocation } from "react-router-dom";

interface PersonalInfoData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  about?: string;
}

interface ExperienceItem {
  position: string;
  employer: string;
  startingDate: string;
  finishingDate: string;
  description: string;
}

type EducationData = {
  education: {
    school: string;
    quality: string;
    startingDate: string;
    finishingDate: string;
    description: string;
  }[];
};

function CVcomponent() {
  const location = useLocation();

  const personalInfoDataString = localStorage.getItem("personalInfoData");
  const personalInfoData: PersonalInfoData | null = personalInfoDataString
    ? JSON.parse(personalInfoDataString)
    : null;

  const experienceDataString = localStorage.getItem("experienceFormData");
  const experienceData: ExperienceItem[] | null = experienceDataString
    ? JSON.parse(experienceDataString).experience
    : null;

  const educationDataString = localStorage.getItem("educationFormData");
  const educationData: EducationData[] | null = educationDataString
    ? JSON.parse(educationDataString).education
    : null;

  return (
    <div style={{ padding: "48px 75px" }}>
      {personalInfoData && (
        <div>
          <Header>
            <Experience>{personalInfoData.name}</Experience>
            <Experience style={{ marginLeft: "20px" }}>
              {personalInfoData.surname}
            </Experience>
          </Header>
          <ContactInfo>
            <img src="/images/Vector (1).png" alt="Email Icon" />
            <ContactText>{personalInfoData.email}</ContactText>
          </ContactInfo>
          <ContactInfo>
            <img src="/images/Vector (2).png" alt="Phone Icon" />
            <ContactText>{personalInfoData.phoneNumber}</ContactText>
          </ContactInfo>
          {personalInfoData.about && (
            <>
              <Experience>ჩემს შესახებ</Experience>
              <AboutText>{personalInfoData.about}</AboutText>
            </>
          )}
        </div>
      )}
      {location.pathname !== "/" && location.pathname !== "/PersonalInfo" && (
        <>
          <Divider />
          <Experience>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</Experience>
          {experienceData &&
            experienceData.map((item, index) => (
              <ExperienceItemWrapper key={index}>
                <Position>{`${item.position} ${item.employer}`}</Position>
                <Date>{`${item.startingDate} ${item.finishingDate}`}</Date>
                <Description>{item.description}</Description>
              </ExperienceItemWrapper>
            ))}
        </>
      )}
      {location.pathname !== "/Home" &&
        location.pathname !== "/PersonalInfo" &&
        location.pathname !== "/Experience" && (
          <>
            <Divider />
            <Experience>განათლება</Experience>
            {experienceData &&
              experienceData.map((item, index) => (
                <ExperienceItemWrapper key={index}>
                  <Position>{`${item.position} ${item.employer}`}</Position>
                  <Date>{`${item.startingDate} ${item.finishingDate}`}</Date>
                  <Description>{item.description}</Description>
                </ExperienceItemWrapper>
              ))}
          </>
        )}
    </div>
  );
}

export default CVcomponent;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-size: 34px;
`;

const ContactInfo = styled.div`
  margin-top: 17px;
  display: flex;
  align-items: center;
`;

const ContactText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-left: 12px;
`;

const AboutText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #c8c8c8;
  margin-top: 18px;
`;

const ExperienceItemWrapper = styled.div`
  margin-top: 15px;
`;

const Experience = styled.h1`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: normal;
  color: #f93b1d;
  margin-top: 24px;
`;

const Position = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  color: #1a1a1a;
`;

const Date = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  color: #909090;
  margin-top: 7px;
`;

const Description = styled.p`
  margin-top: 15px;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: #000;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
`;
