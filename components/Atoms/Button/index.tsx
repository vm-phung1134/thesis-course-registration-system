import { STATE_LECTURER_CLASSROOM } from "@/data";
import { IClassroomObject } from "@/interface/classroom";
import Link from "next/link";
import { FC } from "react";

export interface IButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  otherType?: "subscribe" | "detail" | "value";
  className: string;
  title: string;
  status?: string;
  setToggle?: React.Dispatch<React.SetStateAction<boolean>>;
  toggle?: boolean;
  handleActions?: () => void;
  handleValueActions?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButtonProps> = ({
  type,
  otherType,
  className,
  title,
  toggle,
  status,
  setToggle,
  handleActions,
  handleValueActions,
}) => {
  const handleButtonActions = () => {
    handleActions?.();
    setToggle?.(!toggle);
  };
  const handleValueButtonActions = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleValueActions?.(e);
    setToggle?.(!toggle);
  };
  return (
    <div>
      {otherType === "subscribe" && (
        <button
          onClick={handleButtonActions}
          type={type}
          className={`${className} btn tracking-wide rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}

      {otherType === "value" && (
        <button
          value={
            status === STATE_LECTURER_CLASSROOM.LOCK
              ? STATE_LECTURER_CLASSROOM.UN_LOCK
              : STATE_LECTURER_CLASSROOM.LOCK
          }
          onClick={handleValueButtonActions}
          type={type}
          className={`${className} btn tracking-wide rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}

      {otherType === "detail" && (
        <button
          onClick={() => setToggle?.(!toggle)}
          type={type}
          className={`${className} btn tracking-wide rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}

      {/* Default button */}
      {!otherType && (
        <button
          onClick={() => setToggle?.(!toggle)}
          type={type}
          className={`${className} btn tracking-wide rounded-none capitalize font-normal`}
        >
          {title}
        </button>
      )}
    </div>
  );
};
