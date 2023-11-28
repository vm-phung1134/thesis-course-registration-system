import { NormalAvatar } from "@/components/Atoms";
import { IExerciseObject } from "@/interface/exercise";
import { convertDateTime, convertDateTimeFromString } from "@/utils/covertDate";
import { FC } from "react";

export interface INewFeedCardProps {
  task: IExerciseObject;
  handleOpenTaskModal: (task: IExerciseObject) => void;
}

export const NewFeedCard: FC<INewFeedCardProps> = ({
  task,
  handleOpenTaskModal,
}) => {
  return (
    <div className="rounded-t-xl px-5 py-3 text-sm relative overflow-hidden">
      <div className="-left-72 top-0 bottom-0 w-full h-full bg-green-700 absolute -skew-x-[40deg]"></div>
      <div className="flex justify-between items-center relative">
        <div className="flex gap-2">
          <NormalAvatar setSize="w-11" photoSrc={task?.author?.photoSrc} />
          <div className="flex flex-col">
            <div
              onClick={() => handleOpenTaskModal(task)}
              className="cursor-pointer ease-in-out duration-300 text-white"
            >
              <div className="flex gap-3 items-center">
                <small>{convertDateTimeFromString(task?.updateAt || "")}</small>
              </div>
              <span className="font-medium text-sm">{task?.author?.name}</span>{" "}
              has been added a new{" "}
              {!task.deadline ? "notification" : "report progress"}
            </div>
          </div>
        </div>
        <div className="flex justify-end flex-col items-end gap-1">
          <p className="font-medium text-xs text-green-700">
            {!task.deadline ? "notification" : "report progress"}
          </p>
          <div className="flex gap-3 text-xs font-medium items-center text-red-500">
            <p>{convertDateTime(task?.deadline)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
