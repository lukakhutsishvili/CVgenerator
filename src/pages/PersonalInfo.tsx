import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  FormProvider,
  useForm,
  useController,
  useWatch,
  Controller,
} from "react-hook-form";
import { useEffect } from "react";
import CVcomponent from "../components/CVcomponent";
import Header from "../components/personalInfo/Header";
import Input from "../components/personalInfo/Input";
import { InputMask } from "@react-input/mask";

type formTypes = {
  name: string;
  surname: string;
  about: string;
  photoUrl: string;
  email: string;
  phoneNumber: string;
};

const defaultValues: formTypes = {
  name: "",
  surname: "",
  about: "",
  photoUrl: "",
  email: "",
  phoneNumber: "",
};

export default function PersonalInfo() {
  const navigate = useNavigate();
  const methods = useForm<formTypes>({ defaultValues });

  const submit = (data: formTypes) => {
    console.log(data);
    navigate("/Experience");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        photoUrlField.onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  localStorage.removeItem("photoUrl");
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { submitCount, errors },
  } = methods;

  const { field: photoUrlField } = useController({
    name: "photoUrl",
    control,
    rules: { required: true },
  });

  const getBorderColor = (name: keyof formTypes) => {
    const value = watch(name);
    const hasSubmitted = submitCount > 0;
    const error = errors[name];

    if (hasSubmitted) {
      if (error) {
        return "#ef5050";
      } else if (value) {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };

  const values = useWatch({ control });

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
  }, [methods]);

  const renderStatusImage = () => {
    if (submitCount !== 0) {
      if (!values.phoneNumber && !errors.phoneNumber) {
        return null;
      }
      if (errors.phoneNumber) {
        return (
          <img
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "-37.5px",
            }}
            src="/images/warning.png"
            alt="Warning"
          />
        );
      } else {
        return (
          <img
            src="/images/done.png"
            alt="Done"
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-30%)",
              right: "14.8px",
            }}
          />
        );
      }
    }
  };

  console.log(values);

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
                <div style={{ display: "flex", gap: "50px" }}>
                  <div style={{ width: "calc(50% - 25px)" }}>
                    <Input
                      type="text"
                      labelTxt="სახელი"
                      errorTxt="მინუმუმ 2 სიმბოლო"
                      name="name"
                    >
                      ანზორ
                    </Input>
                  </div>
                  <div style={{ width: "calc(50% - 25px)" }}>
                    <Input
                      type="text"
                      labelTxt="გვარი"
                      errorTxt="მინუმუმ 2 სიმბოლო"
                      name="surname"
                    >
                      მუმლაძე
                    </Input>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span style={{ fontWeight: "500", fontSize: "18px" }}>
                    პირადი ფოტოს ატვირთვა
                  </span>
                  <label htmlFor="file">
                    <div
                      style={{
                        width: "107px",
                        height: "27px",
                        backgroundColor: "#0E80BF",
                        borderRadius: "6px",
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: "14px", fontWeight: "400" }}>
                        ატვირთვა
                      </p>
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <TextArea
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  {...register("about", {
                    required: true,
                  })}
                  style={{ borderColor: getBorderColor("about") }}
                ></TextArea>
                <Input
                  type="text"
                  labelTxt="ელ.ფოსტა"
                  errorTxt="უნდა მთავრდებოდეს @redberry.ge-ით"
                  name="email"
                >
                  anzorr666@redberry.ge
                </Input>
                <div style={{ position: "relative" }}>
                  <label
                    style={{
                      marginBottom: "8px",
                      display: "block",
                      fontWeight: "bold",
                    }}
                  >
                    მობილურის ნომერი
                  </label>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{
                      required: true,
                      minLength: 16,
                    }}
                    render={({ field }) => (
                      <StyledInputMask
                        getbordercolor={getBorderColor("phoneNumber")}
                        {...field}
                        mask="+995 ___ __ __ __"
                        placeholder="+995 551 12 34 56"
                        replacement={{ _: /\d/ }}
                        onChange={(e: any) => {
                          const { value } = e.target;
                          if (!value.startsWith("+995")) {
                            field.onChange("+995");
                          } else {
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                  />
                  {renderStatusImage()}
                  <p style={{ marginTop: "8px", fontSize: "14px" }}>
                    უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს
                  </p>
                </div>
              </div>
            </section>
            <Footer>
              <Link to={"/Home"}>
                <BlueButton type="button">უკან</BlueButton>
              </Link>
              <BlueButton type="submit">შემდეგი</BlueButton>
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
const StyledInputMask = styled(InputMask)`
  height: 48px;
  width: 100%;
  padding: 0 16px;
  border: 1px solid;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  border-color: ${(props) => props.getbordercolor};

  &::placeholder {
    color: #aaa;
  }
`;
