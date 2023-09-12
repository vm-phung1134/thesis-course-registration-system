import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";

export interface IFormFieldProps {
  label: string;
  type: string;
  nameField: string;
  placeholder?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  label,
  type,
  nameField,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <label className="text-sm capitalize" htmlFor={nameField}>
        {label}
      </label>
      <Field
        className="input placeholder:text-sm border-gray-300 rounded-none text-sm focus:outline-none w-full"
        type={type}
        id={nameField}
        placeholder={placeholder}
        name={nameField}
      />
      <ErrorMessage
        className="text-red-500 text-[13px]"
        name={nameField}
        component="div"
      />
    </div>
  );
};
