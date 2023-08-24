import { FC } from "react";

export interface ITitleFormFieldProps {
  title: string;
}

export const TitleFormField: FC<ITitleFormFieldProps> = ({ title }) => {
  return (
    <h3 className="my-4 text-xl font-semibold sm:text-center sm:my-6 sm:text-2xl">
      {title}
    </h3>
  );
};
