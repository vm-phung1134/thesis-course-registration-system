import React, { useState, FC } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

export interface IOptionItem {
  value: string;
  label: string;
}

export interface ISelectBoxProps {
  options: IOptionItem[];
  selected: IOptionItem;
  setSelected: React.Dispatch<React.SetStateAction<IOptionItem>>;
}

export const SelectBox: FC<ISelectBoxProps> = ({
  options,
  setSelected,
  selected,
}) => {
  const handleSelected = (
    newValue: SingleValue<IOptionItem>,
    actionMeta: ActionMeta<IOptionItem>
  ) => {
    setSelected(newValue as IOptionItem);
  };
  return (
    <Select
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "none",
          fontSize: "13px",
          boxShadow: state.isFocused ? "none" : provided.boxShadow,
          borderColor: state.isFocused ? "initial" : provided.borderColor,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#018739" : "white",
          color: state.isSelected ? "white" : "black",
          cursor: "pointer",
          fontSize: "13px",
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "none",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
        }),
      }}
      defaultValue={selected}
      onChange={handleSelected}
      options={options}
    />
  );
};
