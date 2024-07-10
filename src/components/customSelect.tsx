import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { formTypes } from "../pages/Education";

type CustomSelectProps = {
  options: string[];
  defaultValue: string;
  index: number;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
  index,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const {
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, submitCount },
  } = useFormContext<formTypes>();

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedOption !== defaultValue) {
      setValue(`education.${index}.quality`, selectedOption);
    }
    if (selectedOption !== defaultValue) {
      setError(`education.${index}.quality`, {
        type: "manual",
        message: "Please select a different option",
      });
    } else {
      clearErrors(`education.${index}.quality`);
    }
  }, [selectedOption, setValue, setError, clearErrors, defaultValue, index]);
  console.log(errors);

  const getBorderColor = () => {
    const value = watch(`education.${index}.description`);
    const hasSubmitted = submitCount > 0;
    const error = errors?.education?.[index]?.quality;

    if (hasSubmitted) {
      if (error) {
        return "#ef5050";
      } else if (value) {
        return "#98e37e";
      }
    }
    return "#bcbcbc";
  };

  return (
    <SelectContainer>
      <SelectedOption
        style={{ borderColor: getBorderColor() }}
        onClick={() => setIsOpen(!isOpen)}
        isdefault={selectedOption === defaultValue}
      >
        {selectedOption}
        <Arrow />
      </SelectedOption>
      {isOpen && (
        <Dropdown>
          {options.map((option, idx) => (
            <Option key={idx} onClick={() => handleSelectOption(option)}>
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;

const SelectContainer = styled.div`
  position: relative;
  width: -webkit-fill-available;
  height: 48px;
  margin-top: 8px;
`;

const SelectedOption = styled.div<{
  isdefault: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  height: 48px;
  color: ${({ isdefault }) => (isdefault ? "rgba(0, 0, 0, 0.6)" : "#000")};
`;

const Arrow = styled.span`
  margin-left: 10px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 0 0 5px 5px;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
