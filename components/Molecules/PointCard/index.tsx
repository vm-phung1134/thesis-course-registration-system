import { Avatar, Button } from "@/components/Atoms";
import { IMemberObject } from "@/interface/member";
import { getTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { FC, useEffect } from "react";

export interface IPointCardClassProps {
  member: IMemberObject;
  setOpenMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMemberModal: boolean;
  handleGetPointMember: (require: IMemberObject) => void;
}
export const PointCard: FC<IPointCardClassProps> = ({
  member,
  setOpenMemberModal,
  openMemberModal,
  handleGetPointMember,
}) => {
  const handleShowModalMember = () => {
    setOpenMemberModal(!openMemberModal);
    handleGetPointMember(member);
  };
  const dispatch = useAppDispatch();
  const { topic } = useAppSelector((state) => state.topicReducer);
  useEffect(() => {
    dispatch(getTopic(member?.member));
  }, [dispatch, member?.member]);
  return (
    <div className="p-3 bg-slate-100 rounded-xl shadow-lg">
      <div className="flex gap-4 items-center">
        <Avatar
          online={true}
          widthStr="w-10 h-10"
          srcImg={
            member?.member?.photoSrc ||
            "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        />
        <div className="flex flex-col text-sm w-full">
          <div className="flex gap-2 items-center w-full">
            <p className="uppercase font-medium">{member?.member.name}</p>
            <p className="uppercase"> - {member?.member.class}</p>
          </div>
          <p>{member?.member.major}</p>
        </div>
      </div>
      <div className="py-1">
        <p className="text-[15px] py-2 truncate">Topic: {topic?.title}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 pt-2">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          <Button
            setToggle={setOpenMemberModal}
            toggle={openMemberModal}
            otherType="subscribe"
            handleActions={handleShowModalMember}
            title="View detail"
            className="text-sm bg-green-700 btn-sm text-white border-none hover:bg-green-600 px-5 hover:border-none"
          />
        </div>
      </div>
    </div>
  );
};
