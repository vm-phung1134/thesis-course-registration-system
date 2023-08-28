import { FC } from "react";

export interface ITitleFormFieldProps {
  title: string;
  className: string;
}

export const TitleFormField: FC<ITitleFormFieldProps> = ({
  title,
  className,
}) => {
  return (
    <h3
      className={`${className}`}
    >
      {title}
    </h3>
  );
};
