import { ITopicObject } from "@/interface/topic";
import { FC } from "react";

export interface ITopicDescriptionProps {
   topic: ITopicObject;
}

export const TopicDescription: FC<ITopicDescriptionProps> = ({topic}) => {
  return (
    <div>
      <h5 className="mb-5 font-medium capitalize">Topic researching</h5>
      <div className="text-sm flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Name of Topic: </p>
          <p>{topic?.title}</p>
        </div>
        <div className="flex flex-col gap-2">
        <p className="text-gray-500">Number of members: <span className="text-black">{topic?.memberQuantiy}</span></p>
          <p className="text-gray-500">Functional description: </p>
          <ul className="list-disc ml-6">
            <li>Create information student</li>
            <li>Distribute task for teachers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
