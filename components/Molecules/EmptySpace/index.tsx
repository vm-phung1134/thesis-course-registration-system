import { Button } from "@/components/Atoms";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface IEmptySpaceProps {
  text: string;
  img?: string;
}

export const EmptySpace: FC<IEmptySpaceProps> = ({ text, img }) => {
  return (
    <div className="h-[80%] w-full flex flex-col justify-center items-center">
      <Image
        src={
          img ||
          "https://yi-files.s3.eu-west-1.amazonaws.com/products/912000/912743/1548296-full.jpg"
        }
        width="400"
        height="400"
        className="-hue-rotate-[38deg] saturate-[.85]"
        alt=""
      />
      <p className="py-5 text-gray-400 font-medium">Ops! {text}</p>
      <Link href="/manage-classroom">
        <Button
          className="px-10 bg-green-700 text-white hover:bg-green-600"
          title="Back to classroom"
        />
      </Link>
    </div>
  );
};
