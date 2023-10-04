import { Button } from "@/components/Atoms";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface IWaitingClassroomProps {}

export const WaitingClassroom: FC<IWaitingClassroomProps> = () => {
  return (
    <div className="h-[80%] w-full flex flex-col justify-center items-center">
      <Image
        src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
        width="400"
        height="400"
        className="-hue-rotate-[38deg] saturate-[.85]"
        alt=""
      />
      <p className="py-5 text-gray-500 uppercase">
        Ops! Waiting until someone accept you into their classroom
      </p>
      <Link href="/mainboard">
        <Button
          className="px-10 bg-green-700 text-white hover:bg-green-600"
          title="Back to mainboard"
        />
      </Link>
    </div>
  );
};
