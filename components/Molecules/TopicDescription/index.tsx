import { ITopicObject } from "@/interface/topic";
import { FC } from "react";

export interface ITopicDescriptionProps {
   topic: ITopicObject;
}

export const TopicDescription: FC<ITopicDescriptionProps> = ({topic}) => {
  return (
    <div>
      <h5 className="mb-5 font-medium text-green-700 capitalize">Topic researching</h5>
      <div className="text-sm flex flex-col gap-3 text-black">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Name of Topic: </p>
          <p>{topic?.title}</p>
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-gray-500">Number of members: <span className="text-black">{topic?.memberEmail}</span></p>
          <p className="text-gray-500">Functional description: </p>
          <p>{topic?.description}</p>
        </div>
      </div>
    </div>
  );
};
