import styled from "styled-components";
import Redberry from "../../public/images/LOGO-02 3.png";
import BackgroundImage from "/images/shutterstock_2189773743 1.png";
import Agency from "/images/LOGO-02 3.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Background>
      <div className="redberry-image">
        <img src={Redberry} alt="Redberry Logo" />
      </div>
      <div className="center-div">
        <Link to={"/PersonalInfo"}>
          <button>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button>
        </Link>
        <img src={Agency} alt="Agency Logo" />
      </div>
    </Background>
  );
}

const Background = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100vh;
  padding: 0 4.36rem;
  display: flex;
  flex-direction: column;

  .redberry-image {
    width: 100%;
    border-bottom: 0.0625rem solid #1a1a1a;
    img {
      padding-top: 1.57rem;
      padding-bottom: 1.63rem;
    }
  }

  .center-div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;

    img {
      position: absolute;
      right: 270px;
      bottom: 130px;
    }

    button {
      width: 29rem;
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      padding: 1.12rem 0;
      border-radius: 0.5rem;
      background: var(--off-black, #1a1a1a);
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`;
