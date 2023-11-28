import { Button } from "@/components/Atoms";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IExerciseObject } from "@/interface/exercise";
import { ISubmitObject } from "@/interface/submit";
import { convertDateTime } from "@/utils/covertDate";
import { FC } from "react";

export interface ICriticalTaskProps {
  exercise: IExerciseObject | null;
  submission?: ISubmitObject[];
}

export const CriticalTask: FC<ICriticalTaskProps> = ({
  exercise,
  submission,
}) => {
  const { currentUser } = useCurrentUserContext();
  const checkCompletedTask = (submits: ISubmitObject[]): boolean => {
    return submits?.some(
      (item) =>
        item.exerciseID === exercise?.id && currentUser.id === item.userID
    );
  };
  return (
    <div className="h-fit p-5 relative overflow-hidden shadow-xl rounded-lg">
      <div className="absolute top-0 bottom-0 -left-48 w-full h-full bg-slate-100 -skew-x-[30deg]"></div>
      <div className="relative">
        <div className="flex flex-col gap-2">
          <div className="justify-between flex text-sm">
            <h2 className="font-medium">{exercise?.category?.label} stage</h2>
            <p className="text-xs font-medium">
              {checkCompletedTask(submission || []) ? "Submitted" : ""}
            </p>
          </div>
          {exercise?.deadline && (
            <p className="text-red-600 font-medium text-sm mb-2">
              Deadline {convertDateTime(exercise?.deadline)}
            </p>
          )}
        </div>
        <h1 className="font-bold capitalize mb-2 text-[#141E37]">
          {exercise?.title}
        </h1>
        <p className="text-sm text-gray-500 font-thin">
          To achieve the desired effect of having the content inside the div
          with the orange background color using...
        </p>
        <div className="flex justify-end mt-3">
          <button className="bg-green-700 text-white px-5 font-medium text-xs py-2 rounded-md">
            View Detail
          </button>
        </div>
      </div>
    </div>
  );
};
