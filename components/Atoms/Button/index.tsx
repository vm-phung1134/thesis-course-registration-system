import { FC } from "react";

export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  className: string;
  title: string;
  setToggleForm?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm?: boolean;
}

export const Button: FC<IButtonProps> = ({
  type,
  className,
  title,
  toggleForm, //Using for the props of login form
  setToggleForm,
}) => {
  return (
    <button
      onClick={() => setToggleForm?.(!toggleForm)}
      type={type}
      className={`${className} btn rounded-none w-full normal-case font-normal`}
    >
      {title}
    </button>
  );
};
