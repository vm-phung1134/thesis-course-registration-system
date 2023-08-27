import { Avatar } from "@/components/Atoms";
import { FC } from "react";
import { IAuthObject } from "../CardCourse/mock-data";

export interface ICardStudentShortClassProps {
  student: IAuthObject;
}

export const CardStudentShort: FC<ICardStudentShortClassProps> = ({
  student,
}) => {
  return (
    <div className="border py-1 px-2 w-fit">
      <div className="flex gap-2 items-center">
        <Avatar
          widthStr="w-7 h-7"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="cursor-pointer">
          <p className="uppercase text-[13px]">{student.name}</p>
          <p className=" text-[13px] text-gray-500">Submited</p>
        </div>
      </div>
    </div>
  );
};
