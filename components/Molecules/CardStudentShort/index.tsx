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
    <div className="bg-slate-100 rounded-xl my-3 p-2 w-full relative shadow-md">
      <span className="absolute -top-1 right-0 bg-green-600 w-5 h-5 text-[10px] text-white rounded-full pl-1.5 pt-1">
        <i className="fa-solid fa-check"></i>
      </span>
      <div className="flex gap-2 items-center">
        <Avatar
          widthStr="w-9 h-9"
          srcImg={
            submit?.student?.photoSrc ||
            "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        />
        <div className="cursor-pointer">
          <p className="text-sm text-black font-medium">{submit?.student?.name}</p>
          <ul className="w-fit">
            {submit?.attachments?.map((att) => (
              <li key={att.id} className="w-fit flex flex-wrap">
                <a
                  className="text-[13px] text-blue-600 truncate"
                  href={att.src}
                >
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
