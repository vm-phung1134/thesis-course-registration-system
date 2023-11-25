import { Avatar, Button } from "@/components/Atoms";
import { IMemberObject } from "@/interface/member";
import { createMember } from "@/redux/reducer/member/api";
import { deleteRequirement } from "@/redux/reducer/requirement/api";
import { getTopic } from "@/redux/reducer/topic/api";
import { useAppDispatch } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { ITopicObject } from "@/interface/topic";
import { INITIATE_AUTH, INITIATE_TOPIC } from "@/data";
import { IAuthObject } from "@/interface/auth";
import { InforMemberModal } from "@/components/Organisms";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";

export interface ICardRequireMemberProps {
  index: number;
  require: IMemberObject;
}
export const CardRequireMember: FC<ICardRequireMemberProps> = ({
  require,
  index,
}) => {
  const dispatch = useAppDispatch();
  const [topicRenew, setTopicRenew] = useState<IAuthObject>(INITIATE_AUTH);
  // HANDLE GET TOPIC BECAUSE IN TOPIC HAVE MEMBER AND TOPIC

  const [openModalMemberDetail, setOpenModalMemberDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalMemberDetail,
  });
  const handleShowModalRequire = (require: IMemberObject) => {
    setOpenModalMemberDetail(!openModalMemberDetail);
    setTopicRenew(require?.member);
  };
  // HANDLE ADD TO CLASS
  const addMutation = useMutationQueryAPI({
    action: createMember,
    queryKeyLog: ["classroom-requirements"],
    successMsg: "You just add a student to your classroom!",
    errorMsg: "Fail to add a student!",
  });
  const deleteMutation = useMutationQueryAPI({
    action: deleteRequirement,
    queryKeyLog: ["classroom-requirements"],
    successMsg: "You refused a student to your classroom!",
    errorMsg: "Fail to refuse a require!",
  });
  const handleAcceptClass = () => {
    addMutation.mutate({
      registerDefense: false,
      member: require.member,
      classroom: require.classroom,
    });
    deleteMutation.mutate(require);
  };
  // GET TOPIC FOR EACH USER
  const { data: topic_fetch } = useQuery<ITopicObject>({
    queryKey: ["get-one-topic", topicRenew],
    queryFn: async () => {
      const action = await dispatch(getTopic(topicRenew.id));
      return action.payload || {};
    },
    initialData: INITIATE_TOPIC,
  });
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: index * 0.2 }}
        className="p-3 bg-slate-50 shadow-lg rounded-xl"
      >
        <div className="flex gap-4 items-center">
          <Avatar
            online={true}
            widthStr="w-10 h-10"
            srcImg={require?.member?.photoSrc}
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

            <p className="capitalize">Major: {require?.member?.major}</p>
          </div>
        </div>
        <div className="py-1">
          <p className="text-[15px] py-2 truncate">
            Topic: {topic_fetch?.title || "Not updated information"}
          </p>
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
                handleActions={handleAcceptClass}
                title="Accept"
                otherType="subscribe"
                className="bg-green-700 rounded-md text-white btn-sm px-5"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <InforMemberModal
        topic={topic_fetch}
        modalClass={modalClass}
        setOpenMemberModal={setOpenModalMemberDetail}
        openMemberModal={openModalMemberDetail}
      />
      <ToastContainer
        toastStyle={{
          color: "black",
          fontSize: "14px",
          fontFamily: "Red Hat Text",
        }}
      />
    </>
  );
};
