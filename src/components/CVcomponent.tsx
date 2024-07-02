import { useContext } from "react";
import styled from "styled-components";
import { CvContext } from "../App";
import { useLocation } from "react-router-dom";

function CVcomponent() {
  const { experienceCv } = useContext(CvContext);
  const location = useLocation();
  console.log(experienceCv);

  return (
    <div style={{ padding: "48px 75px" }}>
      {location.pathname === "/" ||
        (location.pathname === "/PersonalInfo" ? null : (
          <>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#c8c8c8",
                marginTop: "18px",
              }}
            ></div>
            <Experience>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</Experience>
            {experienceCv.map((item, index) => (
              <div key={index} style={{ marginTop: "15px" }}>
                <div style={{ display: "flex" }}>
                  <Position>{`${item.position} ${item.employer}`}</Position>
                </div>
                <div style={{ display: "flex", marginTop: "7px" }}>
                  <Date>{`${item.startingDate} ${item.finishingDate}`}</Date>
                </div>

                <Description>{item.description}</Description>
              </div>
            ))}
          </>
        ))}
    </div>
  );
}

export default CVcomponent;

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
  font-stretch: normal;
  font-style: italic;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #909090;
`;

const Description = styled.p`
  margin-top: 15px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: break-word;
`;
