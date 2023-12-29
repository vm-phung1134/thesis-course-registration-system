import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";

export interface IFormFieldProps {
  label: string;
  type: string;
  nameField: string;
  placeholder?: string;
  value: string | number | Date;
  className?: string;
  disabled?: boolean;
  autocomplete?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  label,
  type,
  nameField,
  placeholder,
  className,
  value,
  disabled,
  autocomplete
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      <label className="text-sm tracking-wide font-medium" htmlFor={nameField}>
        {label}
      </label>
      <Field
        className={`${className} input placeholder:text-sm  border-gray-400 rounded-full text-sm focus:outline-none w-full`}
        type={type}
        id={nameField}
        placeholder={placeholder}
        name={nameField}
        value={value}
        disabled={disabled}
        autocomplete={autocomplete}
      />
      <ErrorMessage
        className="text-red-500 text-[13px] mt-[-7px]"
        name={nameField}
        component="div"
      />
    </div>
  );
};
