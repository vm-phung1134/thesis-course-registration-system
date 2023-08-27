import Image from "next/image";
import { FC } from "react";

export interface IAvatarProps {
  widthStr: string;
  srcImg: string;
  online?: boolean;
}

export const Avatar: FC<IAvatarProps> = ({
  widthStr,
  online = false,
  srcImg,
}) => {
  return (
    <div className={`avatar ${online ? "online" : ""}`}>
      <div className={`${widthStr} rounded-full`}>
        <Image src={srcImg} width="100" height="100" alt="" />
      </div>
    </div>
  );
};
