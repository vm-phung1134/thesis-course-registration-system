import { Avatar, Button } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import classNames from "classnames";
import { FC } from "react";
import { useState } from "react";

export interface ICardRequireMemberProps {
  student: IAuthObject;
  setOpenMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMemberModal: boolean;
}

// export const ResearchTopic = () => {
//   return (
//     <div className="py-1">
//       <p className="text-[15px] py-2">Topic: Build Blog App</p>
//       <div className="flex justify-between items-center">
//         <div className="flex gap-3 pt-2">
//           <i className="fa-regular fa-envelope"></i>
//           <i className="fa-regular fa-message"></i>
//         </div>
//         <button className="text-green-600 text-sm">View detail</button>
//       </div>
//     </div>
//   );
// };

export const CardRequireMember: FC<ICardRequireMemberProps> = ({
  student,
  setOpenMemberModal,
  openMemberModal,
}) => {
  return (
    <div className="p-3 border shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="flex flex-col text-sm">
          <p
            onClick={() => setOpenMemberModal(!openMemberModal)}
            className="uppercase font-medium cursor-pointer"
          >
            {student.name}
          </p>
          <p className="uppercase">{student.class}</p>
          <p className="capitalize">{student.major}</p>
        </div>
      </div>
      <div className="py-1">
        <p className="text-[15px] py-2">Topic: Build Blog App</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-2">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              title="Decline"
              className="text-red-700 btn-sm border-none  bg-transparent"
            />
            <Button
              title="Accept"
              className="bg-green-700 text-white btn-sm px-5"
            />
          </div>
        </div>

        <div></div>
      </div>
      {/* <ResearchTopic /> */}
    </div>
  );
};
