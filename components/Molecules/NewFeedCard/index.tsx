import { NormalAvatar } from "@/components/Atoms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
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
  const { currentUser } = useCurrentUserContext();
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
              <div className="flex gap-10 items-center">
                <small>{convertDateTimeFromString(task?.updateAt || "")}</small>
                <div className="">
                  {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
                    <div className="flex gap-1">
                      <button className="flex gap-2 px-2 py-1 text-xs items-center">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                        <p>Edit</p>
                      </button>
                    </div>
                  )}
                </div>
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
