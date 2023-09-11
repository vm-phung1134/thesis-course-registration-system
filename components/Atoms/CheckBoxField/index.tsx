import React, { FC } from "react";
import { Field, ErrorMessage } from "formik";

export interface ICheckBoxFieldProps {
  title: string;
  nameField: string;
}

export const CheckBoxField: FC<ICheckBoxFieldProps> = ({
  title,
  nameField,
}) => {
  return (
    <div className="form-control mt-1">
      <label className="cursor-pointer flex gap-3" htmlFor={nameField}>
        <Field
          className="checkbox checkbox-xs"
          id={nameField}
          name={nameField}
        />
        <span className="label-text italic text-gray-500">{title}</span>
      </label>
      <ErrorMessage
        className="text-red-500 text-[13px]"
        name={nameField}
        component="div"
      />
    </div>
  );
};
