import { Avatar } from "@/components/Atoms";
import { ISubmitObject } from "@/interface/submit";
import { FC } from "react";

export interface ICardStudentShortClassProps {
  submit: ISubmitObject;
}

export const CardStudentShort: FC<ICardStudentShortClassProps> = ({
  submit,
}) => {
  return (
    <div className="border py-1 px-2 w-full">
      <div className="flex gap-2 items-center">
        <Avatar
          widthStr="w-7 h-7"
          srcImg={
            submit?.student?.photoSrc ||
            "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        />
        <div className="cursor-pointer">
          <p className="uppercase text-[13px]">{submit?.student?.name}</p>
          <p className=" text-[13px] text-gray-500">Submited</p>
          <ul className="w-fit">
            {submit?.attachments?.map((att) => (
              <li key={att.id} className="w-fit flex flex-wrap">
                <a className="text-[13px] text-blue-600" href={att.src}>
                  {att?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
