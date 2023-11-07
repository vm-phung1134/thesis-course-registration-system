/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
interface INormalAvatarProp {
  photoSrc: string;
  setSize: string;
}

export const NormalAvatar: FC<INormalAvatarProp> = ({ photoSrc, setSize }) => {
  return (
    <div className={`${setSize} h-auto flex-shrink-0`}>
      <div className="avatar object-center">
        <div className="rounded-full">
          <img width={100} height={100} alt="" src={photoSrc} />
        </div>
      </div>
    </div>
  );
};
