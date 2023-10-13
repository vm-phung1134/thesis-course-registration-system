import { Button, SnipperRound } from "@/components/Atoms";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { IClassroomObject } from "@/interface/classroom";

export interface IEnrollSuccessProps {}

export const EnrollSuccess: FC<IEnrollSuccessProps> = () => {
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
              src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?w=740&t=st=1697188462~exp=1697189062~hmac=4107cde7d1b1bb3072f74a5d4614544b955a348d55322b833a1874440721b3dd"
              alt="bg-create-class"
              width="300"
              height="300"
              objectFit="cover"
              objectPosition="center"
            />
            <div className="flex gap-3 flex-col items-center">
              <h4 className="">
                You subscribed for thesis defense in
                <span className="uppercase font-medium"> CT550/HK1-2023</span>
              </h4>
              <p className="font-thin">
                Your graduation thesis defense schedule is being reviewed and
                processed!
              </p>
              <div className="flex gap-3">
                <Button
                  title="the schedule
                  expected 25/05/2023"
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
