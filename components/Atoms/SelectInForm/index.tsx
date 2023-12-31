import { ICategoryObject } from "@/interface/category";
import React, { FC } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

export interface ISelectInFormProps {
  title?: string;
  options: ICategoryObject[];
  selectedStage?: ICategoryObject;
  setSelectedStage?: React.Dispatch<React.SetStateAction<ICategoryObject>>;
}

export const SelectInForm: FC<ISelectInFormProps> = ({
  options,
  selectedStage,
  setSelectedStage,
  title,
}) => {
  const handleSelectedStage = (
    newValue: SingleValue<ICategoryObject>,
    actionMeta: ActionMeta<ICategoryObject>
  ) => {
    setSelectedStage?.(newValue as ICategoryObject);
  };
  return (
    <>
      <p className="text-sm mb-2 font-medium">{title}</p>
      <Select
        styles={{
          control: (provided, state) => ({
            ...provided,
            fontSize: "14px",
            padding: "5px",
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
            borderColor: state.isFocused ? "initial" : provided.borderColor,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#018739" : "white",
            color: state.isFocused ? "white" : "black",
            cursor: "pointer",
            fontSize: "13px",
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: "0.75rem",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }),
        }}
        id="selectInbox"
        instanceId="selectInbox"
        defaultValue={selectedStage}
        onChange={handleSelectedStage}
        options={options}
      />
    </>
  );
};
