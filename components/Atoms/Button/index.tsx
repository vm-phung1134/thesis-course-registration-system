import { FC } from "react";

export interface IButtonProps {
  type?: "button" | "submit" | "reset";
  className: string;
  title: string;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  toggle?: boolean;
}

export const Button: FC<IButtonProps> = ({
  type,
  className,
  title,
  toggle, //Using for the props of toggle
  setToggle,
}) => {
  return (
    <button
      onClick={() => setToggle?.(!toggle)}
      type={type}
      className={`${className} btn rounded-none capitalize font-normal`}
    >
      {title}
    </button>
  );
};
