import { Avatar, Button } from "@/components/Atoms";
import { InforMemberModal } from "@/components/Organisms";
import { INITIATE_AUTH, INITIATE_TOPIC } from "@/data";
import { IAuthObject } from "@/interface/auth";
import { IMemberObject } from "@/interface/member";
import { ITopicObject } from "@/interface/topic";
import { getTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";

export interface ICardMemberClassProps {
  member: IMemberObject;
  index: number;
}
export const CardMember: FC<ICardMemberClassProps> = ({ member, index }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [topicRenew, setTopicRenew] = useState<IAuthObject>(INITIATE_AUTH);
  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });
  const handleShowModalMember = (member: IMemberObject) => {
    setOpenModalMemberDetail(!openModalMemberDetail);
    setTopicRenew(member?.member);
  };
  // GET TOPIC FOR EACH USER
  const { data: topic_fetch } = useQuery<ITopicObject>({
    queryKey: ["topic", member?.member?.id],
    queryFn: async () => {
      const action = await dispatch(getTopic(member?.member?.id));
      return action.payload || {};
    },
    initialData: INITIATE_TOPIC,
  });
  return (
    <>
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
          <p className="text-[15px] py-2 truncate">
            Topic: {topic_fetch?.title}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 pt-2">
              <i className="fa-regular fa-envelope"></i>
              <i className="fa-regular fa-message"></i>
            </div>
            <Button
              setToggle={setOpenModalMemberDetail}
              toggle={openModalMemberDetail}
              title="View detail"
              className="text-sm bg-green-700 btn-sm text-white border-none hover:bg-green-600 px-5 hover:border-none"
            />
          </div>
        </div>
      </div>
      <InforMemberModal
        topic={topic_fetch}
        modalClass={modalClass}
        setOpenMemberModal={setOpenModalMemberDetail}
        openMemberModal={openModalMemberDetail}
      />
    </>
  );
};
