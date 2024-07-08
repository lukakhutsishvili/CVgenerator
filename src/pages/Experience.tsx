import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FormProvider,
  useForm,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { CvContext, CvData } from "../App";
import CVcomponent from "../components/CVcomponent";
import Input from "../components/experience/Input";
import Header from "../components/experience/Header";

type formTypes = {
  experience: {
    position: string;
    employer: string;
    startingDate: string;
    finishingDate: string;
    description: string;
  }[];
};

export default function Experience() {
  const [experienceInfo, setExperienceInfo] = useState<formTypes>();
  const navigate = useNavigate();
  const { setExperienceCv, experienceCv } = useContext(CvContext);
  const methods = useForm<formTypes>({
    defaultValues: {
      experience: [
        {
          position: "",
          employer: "",
          startingDate: "",
          finishingDate: "",
          description: "",
        },
      ],
    },
  });

  const submit = (data: formTypes) => {
    setExperienceInfo(data);
    navigate("/Education");
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { submitCount, errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const getBorderColor = (index: number) => {
    const value = watch(`experience.${index}.description`);
    const hasSubmitted = submitCount > 0;
    const error = errors?.experience?.[index]?.description;

    if (hasSubmitted) {
      if (error) {
        return "#ef5050";
      } else if (value) {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };

  const values = useWatch({ control, name: `experience` });
  useEffect(() => {
    setExperienceCv(values as CvData);
  }, [values, setExperienceCv]);
  console.log(experienceInfo);
  useEffect(() => {
    const savedData = localStorage.getItem("experienceFormData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("experienceFormData", JSON.stringify(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods, setExperienceCv, experienceCv]);

  return (
    <div style={{ display: "flex" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>
          <MainDiv>
            <Header />
            <section style={{ marginTop: "77px", paddingLeft: "102px" }}>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "31px",
                    flexDirection: "column",
                    marginTop: index !== 0 ? "40px" : "0",
                  }}
                >
                  <Input
                    type="text"
                    labelTxt="თანამდებობა"
                    errorTxt="მინუმუმ 2 სიმბოლო"
                    name={`experience.[${index}].position`}
                  >
                    დეველოპერი, დიზაინერი, ა.შ.
                  </Input>
                  <Input
                    type="text"
                    labelTxt="დამსაქმებელი"
                    errorTxt="მინუმუმ 2 სიმბოლო"
                    name={`experience.[${index}].employer`}
                  >
                    დამსაქმებელი
                  </Input>
                  <div style={{ display: "flex", gap: "56px" }}>
                    <div style={{ width: "calc(50% - 23px)" }}>
                      <Input
                        type="date"
                        labelTxt="დაწყების რიცხვი"
                        name={`experience.[${index}].startingDate`}
                      ></Input>
                    </div>
                    <div style={{ width: "calc(50% - 23px)" }}>
                      <Input
                        type="date"
                        labelTxt="დაწყების რიცხვი"
                        name={`experience.${index}.finishingDate`}
                      ></Input>
                    </div>
                  </div>
                  <TextArea
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    {...register(`experience.${index}.description`, {
                      required: true,
                    })}
                    style={{ borderColor: getBorderColor(index) }}
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
                  >
                    {index !== 0 && (
                      <DeleteButton type="button" onClick={() => remove(index)}>
                        გამოცდილების წაშლა
                      </DeleteButton>
                    )}
                  </div>
                </div>
              ))}

              <LightSkyButton
                style={{ marginTop: fields.length !== 1 ? "-48px" : "0px" }}
                type="button"
                onClick={() =>
                  append({
                    position: "",
                    employer: "",
                    startingDate: "",
                    finishingDate: "",
                    description: "",
                  })
                }
              >
                მეტი გამოცდილების დამატება
              </LightSkyButton>
            </section>
            <Footer>
              <Link to={"/PersonalInfo"}>
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

const DeleteButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: none;
  background-color: red;
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
