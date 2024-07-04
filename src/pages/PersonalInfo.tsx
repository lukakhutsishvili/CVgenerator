import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { CvContext, PersonaInfoCvData } from "../App";
import CVcomponent from "../components/CVcomponent";
import Header from "../components/personalInfo/Header";
import Input from "../components/personalInfo/personalInfoInput";

type formTypes = {
  name: string;
  surname: string;
  about: string;
};

export default function PersonalInfo() {
  const [experienceInfo, setExperienceInfo] = useState<formTypes>();
  const navigate = useNavigate();
  const { personalInfoCv, setPersonalInfoCv } = useContext(CvContext);
  const methods = useForm<formTypes>({});

  const submit = (data: formTypes) => {
    setExperienceInfo(data);
    navigate("/Experience");
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { submitCount, errors },
  } = methods;

  const getBorderColor = () => {
    const value = watch();
    const hasSubmitted = submitCount > 0;
    const error = errors?.about;

    if (hasSubmitted) {
      if (error) {
        return "#ef5050";
      } else if (value) {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };
  console.log("asd");

  const values = useWatch({ control });
  useEffect(() => {
    setPersonalInfoCv(values as PersonaInfoCvData);
  }, [values, setPersonalInfoCv]);
  useEffect(() => {
    const savedData = localStorage.getItem("personalInfoData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("personalInfoData", JSON.stringify(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods, personalInfoCv, setPersonalInfoCv]);

  return (
    <div style={{ display: "flex" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <MainDiv>
            <Header />
            <section style={{ marginTop: "77px", paddingLeft: "102px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "31px",
                  flexDirection: "column",
                }}
              >
                <Input
                  type="text"
                  labelTxt="სახელი"
                  errorTxt="მინუმუმ 2 სიმბოლო"
                  name={`name`}
                >
                  დეველოპერი, დიზაინერი, ა.შ.
                </Input>
                <Input
                  type="text"
                  labelTxt="გვარი"
                  errorTxt="მინუმუმ 2 სიმბოლო"
                  name={`surname`}
                >
                  დამსაქმებელი
                </Input>
                <TextArea
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  {...register(`about`, {
                    required: true,
                  })}
                  style={{ borderColor: getBorderColor() }}
                ></TextArea>
                <div
                  style={{
                    marginTop: "56px",
                    height: "1px",
                    width: "100%",
                    backgroundColor: "#bcbcbc",
                  }}
                ></div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                ></div>
              </div>
            </section>
            <Footer>
              <Link to={"/Home"}>
                <BlueButton type="button">უკან</BlueButton>
              </Link>
              <BlueButton>შემდეგი</BlueButton>
            </Footer>
          </MainDiv>
        </form>
      </FormProvider>
      <CVcomponent />
    </div>
  );
}

const MainDiv = styled.div`
  width: 1078px;
  background-color: #f9f9f9;
  padding: 45px 149px 65px 48px;
  min-height: 100vh;
`;

const TextArea = styled.textarea`
  height: 123px;
  padding-left: 16px;
  padding-top: 13px;
  resize: none;
  border: solid 1px;
  border-radius: 4px;
  outline: none;
`;

const Footer = styled.footer`
  padding-left: 102px;
  margin-top: 115px;
  display: flex;
  justify-content: space-between;
`;

export const LightSkyButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: #62a1eb;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  padding: 14px 22px;
  cursor: pointer;
`;

export const BlueButton = styled(LightSkyButton)`
  background-color: #6b40e3;
  padding: 10px 18px;
`;
