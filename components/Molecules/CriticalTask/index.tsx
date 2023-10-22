import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface ICriticalTaskProps {}

export const CriticalTask: FC<ICriticalTaskProps> = () => {
  return (
    <div className="h-fit p-5 border rounded-xl relative overflow-hidden shadow-xl">
      <div className="absolute top-0 bottom-0 -left-48 w-full h-full bg-gray-100 -skew-x-[30deg]"></div>
      <div className="relative">
        <div className="flex justify-between">
           <h2 className="font-medium text-sm capitalize">Critical report stage</h2>
        <p className="text-red-600 text-sm mb-2">Deadline 28, August 2023</p>
        </div>
       
        <h1 className="font-bold capitalize text-base my-2">
          report progress thesis design stage
        </h1>
        <p className="text-sm text-gray-500 font-thin">
          To achieve the desired effect of having the content inside the div
          with the orange background color using...
        </p>

        <div className="flex justify-end">
          <Button
            className="btn rounded-none text-green-700 bg-transparent p-0 hover:bg-transparent border-none capitalize font-normal"
            title="View detail"
          />
        </div>
      </div>
    </div>
  );
};
