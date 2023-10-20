import Image from "next/image";
import { FC } from "react";

export interface IIconButtonProps {
  className: string;
  classNameIcon: string;
  srcIcon: string;
  title: string;
  setToggleForm?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm?: boolean;
}

export const IconButton: FC<IIconButtonProps> = ({
  className,
  classNameIcon,
  srcIcon,
  title,
  setToggleForm, //Using for the props of login form
  toggleForm,
}) => {
  return (
    <button
      onClick={() => setToggleForm?.(!toggleForm)}
      type="button"
      className={`btn rounded-full font-normal capitalize ${className}`}
    >
      <Image
        className={classNameIcon}
        src={srcIcon}
        width="20"
        height="20"
        alt="icon-social-login"
      />
      <p>{title}</p>
    </button>
  );
};
