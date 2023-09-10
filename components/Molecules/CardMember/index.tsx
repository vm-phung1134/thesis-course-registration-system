import { Avatar, Button } from "@/components/Atoms";
import { IAuthObject } from "@/interface/auth";
import classNames from "classnames";
import { FC } from "react";
import { useState } from "react";

export interface ICardMemberClassProps {
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

export const CardMember: FC<ICardMemberClassProps> = ({
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
          <p className="uppercase font-medium">{student.name}</p>
          <p className="uppercase">{student.class}</p>
          <p>{student.major}</p>
        </div>
      </div>
      <div className="py-1">
        <p className="text-[15px] py-2">Topic: Build Blog App</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-2">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          <Button
            setToggle={setOpenMemberModal}
            toggle={openMemberModal}
            title="View detail"
            className="text-green-600 text-sm bg-transparent border-none hover:bg-transparent hover:border-none"
          />
        </div>
      </div>
      {/* <ResearchTopic /> */}
    </div>
  );
};
