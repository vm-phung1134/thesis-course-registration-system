import { ITopicKeyObject } from "@/interface/classroom";
import { FC } from "react";

export interface ITopicTagProps {
  arrTopics: ITopicKeyObject[] | undefined;
}

export const TopicTag: FC<ITopicTagProps> = ({ arrTopics }) => {
  return (
    <ul className="flex gap-2 flex-wrap cursor-pointer">
      {arrTopics?.map((tag) => {
        return (
          <li
            key={tag.id}
            className="py-1 px-2 bg-gray-600 text-white text-xs w-fit"
          >
            {tag.label}
          </li>
        );
      })}
    </ul>
  );
};
