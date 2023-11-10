import { Button } from "@/components/Atoms";
import { IExerciseObject } from "@/interface/exercise";
import { convertDateTime } from "@/utils/covertDate";
import { FC } from "react";

export interface ICriticalTaskProps {
  exercise: IExerciseObject;
}

export const CriticalTask: FC<ICriticalTaskProps> = ({ exercise }) => {
  return (
    <div className="h-fit p-5 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 bottom-0 -left-48 w-full h-full bg-slate-100 -skew-x-[30deg]"></div>
      <div className="relative">
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-sm">
            {exercise?.category?.label} stage
          </h2>
          <p className="text-red-600 font-medium text-sm mb-2">
            Deadline {convertDateTime(exercise?.deadline)}
          </p>
        </div>
        <h1 className="font-bold capitalize mb-2 text-[#141E37]">
          {exercise?.title}
        </h1>
        <p className="text-sm text-gray-500 font-thin">
          To achieve the desired effect of having the content inside the div
          with the orange background color using...
        </p>

        <div className="flex justify-end">
          <button className="ml-5 mt-5 py-3 px-8 bg-green-700 hover:bg-[#141E37] transform ease-linear text-xs duration-300 text-white font-medium -skew-x-[20deg]">
            <p className="skew-x-12">View Detail</p>
          </button>
        </div>
      </div>
    </div>
  );
};
