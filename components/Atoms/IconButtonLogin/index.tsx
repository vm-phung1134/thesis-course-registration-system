import Image from "next/image";
import { FC } from "react";

export interface IIconButtonLoginProps {
  className?: string;
  classNameIcon?: string;
  srcIcon: string;
  title: string;
  methodLogin: () => void;
}

export const IconButtonLogin: FC<IIconButtonLoginProps> = ({
  className,
  classNameIcon,
  srcIcon,
  title,
  methodLogin,
}) => {
  return (
    <button
      onClick={methodLogin}
      type="button"
      className={`btn rounded-full bg-gray-200 border-none tracking-wide font-medium capitalize ${className}`}
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
