import { SnipperRound } from "@/components/Atoms";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export interface IEnrollSuccessProps {}

export const EnrollSuccess: FC<IEnrollSuccessProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {loading ? (
        <SnipperRound />
      ) : (
        <>
          <div className="flex gap-20 justify-center items-center min-h-[70%] max-h-full">
            <Image
              src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3957.jpg?w=740&t=st=1697188462~exp=1697189062~hmac=4107cde7d1b1bb3072f74a5d4614544b955a348d55322b833a1874440721b3dd"
              alt="bg-create-class"
              width="300"
              height="300"
              objectFit="cover"
              objectPosition="center"
              className="dark:rounded-full"
            />
            <div className="flex gap-3 flex-col items-start">
              <div className="w-[30rem] relative h-fit">
                <h4 className="uppercase text-[35px] text-[#141E37] italic font-bold leading-snug pl-8 dark:text-white">
                  You subscribed for thesis defense in
                  <span className="uppercase font-medium"> CT550/HK1-2023</span>
                </h4>
                <span className="absolute top-3 bottom-3 w-1 bg-[#141E37]"></span>
                <span className="absolute top-3 -left-1 h-14 w-3 bg-[#141E37]"></span>
              </div>
              <p>
                Your graduation thesis defense schedule is being reviewed and
                processed!
              </p>
              <div className="flex gap-3">
                <button className="ml-5 mt-5 py-3 px-8 bg-green-700 hover:bg-[#141E37] transform ease-in-out duration-500 text-white -skew-x-[20deg]">
                  <p className="skew-x-12">
                    Your schedule expected - Saturday, 25/11/2023
                  </p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
