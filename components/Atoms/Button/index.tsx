import Link from "next/link";
import { FC } from "react";

export interface IButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  otherType?: "subscribe" | "detail";
  className: string;
  title: string;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  toggle?: boolean;
}

export const Button: FC<IButtonProps> = ({
  type,
  id,
  otherType,
  className,
  title,
  toggle,
  setToggle,
}) => {
  const handleChangeSubcribe = () => {
    // call api check status
  };
  return (
    <div>
      {otherType === "subscribe" && (
        <button
          onClick={handleChangeSubcribe}
          type={type}
          className={`${className} btn rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}

      {otherType === "detail" && (
        <button
          onClick={() => setToggle?.(!toggle)}
          type={type}
          className={`${className} btn rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}

      {/* Default button */}
      {!otherType && (
        <button
          onClick={() => setToggle?.(!toggle)}
          type={type}
          className={`${className} btn rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}
    </div>
  );
};
