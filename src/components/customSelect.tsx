import React, { useState } from "react";
import styled from "styled-components";

type CustomSelectProps = {
  options: string[];
  defaultValue: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectedOption onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <Arrow />
      </SelectedOption>
      {isOpen && (
        <Dropdown>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleSelectOption(option)}>
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
  width: webkit-fill-available;
  height: 48px;
  margin-top: 8px;
`;

const SelectedOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  height: 48px;
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
