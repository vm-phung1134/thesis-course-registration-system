import { ITopicKeyObject } from "@/interface/classroom";
import { FC } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

export interface ISelectMultiProps {
  options: ITopicKeyObject[];
  selected: ITopicKeyObject[];
  setSelected: React.Dispatch<React.SetStateAction<ITopicKeyObject[]>>;
}

export const SelectMulti: FC<ISelectMultiProps> = ({
  options,
  setSelected,
  selected,
}) => {
  const handleMultiSelect = (
    newValue: MultiValue<ITopicKeyObject>,
    actionMeta: ActionMeta<ITopicKeyObject>
  ) => {
    setSelected(newValue as ITopicKeyObject[]);
  };
  return (
    <Select
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderRadius: "none",
          fontSize: "13px",
          padding: `5px`,
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
      defaultValue={[options[0], options[1]]}
      isMulti
      onChange={handleMultiSelect}
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};
