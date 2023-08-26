import Image from "next/image";
import { FC } from "react";

export interface ILogoAppProps {
  width: number;
  height: number;
  className?: string;
}

export const LogoApp: FC<ILogoAppProps> = ({ width, height, className }) => {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex gap-3">
        <Image
          src="https://img.icons8.com/?size=512&id=Fpssohz57mWe&format=png"
          width={width}
          height={height}
          alt="Logo CTU"
        />
        <p className={className}>TCR System</p>
      </div>
    </div>
  );
};
