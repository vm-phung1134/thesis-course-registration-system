import { Avatar } from "@/components/Atoms";
import { IExerciseObject } from "@/interface/exercise";
import { IPostObject } from "@/interface/post";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";

export interface INewFeedCardProps {
  task: IPostObject | IExerciseObject;
  handleOpenTaskModal: (task: any) => void;
}

export const NewFeedCard: FC<INewFeedCardProps> = ({
  task,
  handleOpenTaskModal,
}) => {
  return (
    <div className="border px-5 py-3 text-sm bg-green-700 text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            widthStr="w-10 h-10"
            srcImg={
              task?.lecturer?.photoSrc ||
              "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          />
          <div className="flex flex-col">
            <div
              onClick={() => handleOpenTaskModal(task)}
              className="cursor-pointer ease-in-out duration-300"
            >
              <div className="flex gap-3 items-center">
                <p className="text-xs px-3 py-1 bg-green-900 w-fit">
                  {task?.type === "post" ? "Message" : "Exercise"}
                </p>
                <small>20, August 2023 - 20:30 PM</small>
              </div>
              <span className="font-medium">
                {convertToUnaccentedString(task?.lecturer?.name)}
              </span>{" "}
              has been added a new{" "}
              {task.type === "post" ? "Message" : "Exercise"}
            </div>
          </div>
        </div>
        <button>...</button>
      </div>
    </div>
  );
};
