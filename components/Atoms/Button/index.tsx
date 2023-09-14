import Link from "next/link";
import { FC } from "react";

export interface IButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  otherType?: "subscribe";
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
  toggle, //Using for the props of toggle
  setToggle,
}) => {
  const handleChangeSubcribe = () => {
    // call api get course with id as props
  };
  return (
    <div>
      {otherType === "subscribe" && (
        <Link href={`mainboard/subscribe-course/${id}`}>
          <button
            onClick={handleChangeSubcribe}
            type={type}
            className={`${className} btn rounded-none capitalize font-normal`}
          >
            {title}
          </button>
        </Link>
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
