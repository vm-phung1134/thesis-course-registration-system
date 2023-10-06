import { Button, SnipperRound } from "@/components/Atoms";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";

export interface IUnSubscribeViewProps {
  classroom: IClassroomObject;
}

export const UnSubscribeView: FC<IUnSubscribeViewProps> = ({ classroom }) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="flex gap-2 justify-center items-center min-h-[70%] max-h-full">
            <Image
              src="https://tailwindcomponents.com/svg/queue-animate.svg"
              alt="bg-create-class"
              width="300"
              height="300"
              className="-hue-rotate-[38deg] saturate-[.85]"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="flex gap-3 flex-col items-center">
              <h4 className="">
                You subscribed classroom of{" "}
                <span className="uppercase font-medium">
                  {classroom?.lecturer?.name}
                </span>
              </h4>
              <p className="font-thin">
                <span className="font-medium">Congratulation </span>! You have
                been added into class
              </p>
              <div className="flex gap-3">
                <Button
                  title="Unsubcribe"
                  className="px-5 bg-transparent hover:bg-transparent hover:border-none border-none"
                />
                <Button
                  title="Go to your class"
                  className="px-5 bg-green-700 text-white hover:bg-green-600"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
