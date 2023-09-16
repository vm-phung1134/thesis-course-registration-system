import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import React, { FC } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

export interface ISelectBoxProps {
  setPadding?: string;
  options: IOptionItem[] | ICategoryObject[];
  selected: IOptionItem | ICategoryObject;
  setSelected: React.Dispatch<
    React.SetStateAction<IOptionItem | ICategoryObject>
  >;
}

export const SelectBox: FC<ISelectBoxProps> = ({
  options,
  setSelected,
  selected,
  setPadding,
}) => {
  const handleSelected = (
    newValue: SingleValue<IOptionItem | ICategoryObject>,
    actionMeta: ActionMeta<IOptionItem | ICategoryObject>
  ) => {
    setSelected(newValue as IOptionItem | ICategoryObject);
  };
  return (
    <Select
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "none",
          fontSize: "13px",
          padding: `${setPadding === "lg" ? "5px" : ""}`,
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
          borderRadius: "none",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }),
      }}
      id="selectbox"
      instanceId="selectbox"
      defaultValue={selected}
      onChange={handleSelected}
      options={options}
    />
  );
};
