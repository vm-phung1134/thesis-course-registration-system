import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";

export interface IFormFieldProps {
  label: string;
  type: string;
  nameField: string;
}

export const FormField: FC<IFormFieldProps> = ({ label, type, nameField }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm" htmlFor={nameField}>{label}</label>
      <Field className="input border-gray-300 text-sm font-thin focus:outline-none w-full" type={type} id={nameField} name={nameField} />
      <ErrorMessage className="text-red-500 text-[13px]" name={nameField} component="div" />
    </div>
  );
};
