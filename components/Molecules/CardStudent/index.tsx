import { Avatar } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import { FC } from "react";

export interface ICardStudentClassProps {
  student: IAuthObject;
}

export const ResearchTopic = () => {
  return (
    <div className="py-1">
      <p className="text-[15px] py-2">Topic: Build Blog App</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 pt-2">
          <i className="fa-regular fa-envelope"></i>
          <i className="fa-regular fa-message"></i>
        </div>
        <button className="text-green-600 text-sm">View detail</button>
      </div>
    </div>
  );
};

export const CardStudent: FC<ICardStudentClassProps> = ({ student }) => {
  return (
    <div className="p-3 border shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="flex flex-col text-sm">
          <p className="uppercase font-medium">{student.name}</p>
          <p className="uppercase">{student.class}</p>
          <p>{student.major}</p>
        </div>
      </div>
      <ResearchTopic />
    </div>
  );
};
