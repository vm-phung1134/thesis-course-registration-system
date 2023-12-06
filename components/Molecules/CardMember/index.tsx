import { Avatar, Button } from "@/components/Atoms";
import { InforMemberModal } from "@/components/Organisms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { INITIATE_TOPIC } from "@/data";
import { IMemberObject } from "@/interface/member";
import { ITopicObject } from "@/interface/topic";
import { getTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useState } from "react";
import { ModalConfirm } from "..";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { deleteMember } from "@/redux/reducer/member/api";

export interface ICardMemberClassProps {
  member: IMemberObject;
  index: number;
}
export const CardMember: FC<ICardMemberClassProps> = ({ member, index }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const [topicRenew, setTopicRenew] = useState<ITopicObject>(INITIATE_TOPIC);
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });

  const [openModalKickoutMember, setOpenModalKickoutMember] =
    useState<boolean>(false);
  const modalClassKickout = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalKickoutMember,
  });

  // GET TOPIC FOR EACH USER
  const { data: topic_fetch } = useQuery<ITopicObject>({
    queryKey: ["get-one-topic", member.member],
    queryFn: async () => {
      const action = await dispatch(getTopic(member.member));
      return action.payload || {};
    },
    initialData: INITIATE_TOPIC,
  });
  const handleShowModalMember = () => {
    setOpenModalMemberDetail(!openModalMemberDetail);
    setTopicRenew(topic_fetch);
  };

  const kickoutMutation = useMutationQueryAPI({
    action: deleteMember,
    queryKeyLog: ["classroom-members"],
    successMsg: "You just kicked a student out of the room!",
    errorMsg: "Fail to kick out this student!",
  });
  const handleKickoutMember = () => {
    kickoutMutation.mutate(member);
  };
  return (
    <>
      <div
        onClick={handleShowModalMember}
        className="p-3 bg-slate-100 rounded-xl shadow-lg cursor-pointer"
      >
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
              <p className="uppercase font-medium">{member?.member?.name}</p>
              <p className="uppercase"> - {member?.member?.class}</p>
            </div>
            <p>{member?.member?.major || "Computer Science"}</p>
          </div>
        </div>
        <div className="py-1">
          <p className="text-[15px] py-2 truncate">
            Topic: {topic_fetch?.title || "Not update information"}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 pt-2">
              <i className="fa-regular fa-envelope"></i>
              <i className="fa-regular fa-message"></i>
            </div>
            <div className="flex gap-1">
              {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
                <Button
                  type="button"
                  setToggle={setOpenModalKickoutMember}
                  toggle={openModalKickoutMember}
                  title="Kick out"
                  className="text-sm btn-sm text-red-600 border-none px-3 bg-transparent hover:border-none"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        modalClass={modalClassKickout}
        setOpenModal={setOpenModalKickoutMember}
        openModal={openModalKickoutMember}
        action={handleKickoutMember}
        typeButton="subscribe"
        underMessage="No Message"
        title="Message!!!"
        message="Do you want call on all people to press F11?"
      />
      <InforMemberModal
        topic={topicRenew}
        modalClass={modalClass}
        setOpenMemberModal={setOpenModalMemberDetail}
        openMemberModal={openModalMemberDetail}
      />
    </>
  );
};
