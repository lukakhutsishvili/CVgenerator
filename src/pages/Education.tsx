import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { useEffect } from "react";
import CVcomponent from "../components/CVcomponent";
import Input from "../components/education/Input";
import Header from "../components/education/Header";

import { Select } from "antd";

const { Option } = Select;
export type formTypes = {
  education: {
    school: string;
    quality: string;
    startingDate: string;
    finishingDate: string;
    description: string;
  }[];
};

export default function Education() {
  const navigate = useNavigate();
  const methods = useForm<formTypes>({
    defaultValues: {
      education: [
        {
          school: "",
          quality: "",
          startingDate: "",
          finishingDate: "",
          description: "",
        },
      ],
    },
  });

  const submit = () => {
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
    name: "education",
  });

  console.log(errors);

  const getBorderColor = (index: number) => {
    const value = watch(`education.${index}.description`);
    const hasSubmitted = submitCount > 0;
    const error = errors?.education?.[index]?.description;

    if (hasSubmitted) {
      if (error) {
        return "#ef5050";
      } else if (value) {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };

  useEffect(() => {
    const savedData = localStorage.getItem("educationFormData");
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("educationFormData", JSON.stringify(value));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

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
                    labelTxt="სასწავლებელი"
                    errorTxt="მინუმუმ 2 სიმბოლო"
                    name={`education.[${index}].school`}
                  >
                    დეველოპერი, დიზაინერი, ა.შ.
                  </Input>
                  <div style={{ display: "flex", gap: "56px" }}>
                    <div
                      className="custom-select"
                      style={{ width: "calc(50% - 23px)" }}
                    >
                      <Label style={{ display: "block" }}>ხარისხი</Label>
                      <Controller
                        name={`education.${index}.quality`}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            style={{
                              marginTop: "8px",
                              height: "48px",
                              width: "100%",
                            }}
                          >
                            <Option value="net1">Net 1 day</Option>
                            <Option value="net7">Net 7 days</Option>
                            <Option value="net14">Net 14 days</Option>
                            <Option value="net30">Net 30 days</Option>
                          </Select>
                        )}
                      />
                    </div>
                    <div style={{ width: "calc(50% - 23px)" }}>
                      <Input
                        type="date"
                        labelTxt="დამთავრების რიცხვი"
                        name={`education.${index}.finishingDate`}
                      ></Input>
                    </div>
                  </div>
                  <TextArea
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    {...register(`education.${index}.description`, {
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
                        განათლების წაშლა
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
                    school: "",
                    quality: "",
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
const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.31;
`;
