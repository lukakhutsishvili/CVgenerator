import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  labelTxt: string;
  children?: string;
  errorTxt?: string;
  type: string;
  name: string;
}

const Input: React.FC<InputProps> = ({
  labelTxt,
  children,
  errorTxt,
  type,
  name,
}) => {
  const {
    register,
    watch,
    formState: { errors, submitCount },
  } = useFormContext();

  // const georgianRegex = /^[ა-ჰ]+$/;

  // const validateGeorgian = (value: string) =>
  //   georgianRegex.test(value) || "Must contain only Georgian characters";

  // const validateMinLength = (value: string) =>
  //   value.length >= 2 || "Must be at least 2 characters";

  const validationRules: any = {
    required: "This field is required",
    minLength: {
      value: 2,
      message: "Must be at least 2 characters",
    },
  };

  // if (name.includes("position") || name.includes("employer")) {
  //   validationRules.validate = {
  //     minLength: validateMinLength,
  //     georgian: validateGeorgian,
  //   };
  // }

  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(/[\.\[\]]+/)
      .filter(Boolean)
      .reduce((acc, part) => acc && acc[part], obj);
  };

  const errorMessage = getNestedValue(errors, name);
  const value = watch(name);

  const getBorderColor = () => {
    if (submitCount !== 0) {
      if (!value && !errorMessage) {
        return "#bcbcbc";
      }
      if (errorMessage) {
        return "#ef5050";
      } else {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };

  const renderStatusImage = () => {
    if (name.includes("position") || name.includes("employer")) {
      if (submitCount !== 0) {
        if (!value && !errorMessage) {
          return null;
        }
        if (errorMessage) {
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
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Label>{labelTxt}</Label>
      <Inputs
        placeholder={type === "text" ? children : ""}
        type={type}
        {...register(name, validationRules)}
        style={{
          borderColor: getBorderColor(),
          color:
            value === "mm/dd/yyyy" || value === ""
              ? "rgba(0, 0, 0, 0.6)"
              : "black",
        }}
      />
      {renderStatusImage()}
      <p style={{ marginTop: "8px", fontSize: "14px", color: "#2e2e2e" }}>
        {errorTxt}
      </p>
    </div>
  );
};

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.31;
`;

const Inputs = styled.input<{ height?: string }>`
  width: -webkit-fill-available;
  height: 48px;
  padding-left: 16px;

  margin-top: 8px;
  border: solid 1px;
  background-color: #fff;
  border-radius: 4px;
  padding-right: 15px;
  outline: none;
  font-size: 16px;
  font-weight: normal;

  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: normal;
  }
`;

export default Input;
