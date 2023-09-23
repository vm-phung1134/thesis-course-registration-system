import { Avatar, Button } from "@/components/Atoms";
import { IMemberObject } from "@/interface/member";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";

export interface ICardRequireMemberProps {
  require: IMemberObject;
  setOpenMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMemberModal: boolean;
  handleGetTopicRequire: (require: IMemberObject) => void;
}
export const CardRequireMember: FC<ICardRequireMemberProps> = ({
  require,
  setOpenMemberModal,
  openMemberModal,
  handleGetTopicRequire,
}) => {
  const handleShowModalRequire = (require: IMemberObject) => {
    setOpenMemberModal(!openMemberModal);
    handleGetTopicRequire(require);
  };
  return (
    <div className="p-3 border shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        <div className="flex flex-col text-sm">
          <div className="flex gap-3">
            <p
              onClick={() => handleShowModalRequire(require)}
              className="uppercase font-medium cursor-pointer"
            >
              {convertToUnaccentedString(require?.member?.name)}
            </p>
            <span>-</span>
            <p className="font-normal">{require?.member?.class}</p>
          </div>

          <p className="capitalize">{require?.member?.major}</p>
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
      </div>
    </div>
  );
};
