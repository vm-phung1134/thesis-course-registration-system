import { FC } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { useState } from "react";
import classNames from "classnames";
import {
  ClassroomContentCard,
  ClassroomDetailModal,
} from "@/components/Molecules";
import { createRequirement } from "@/redux/reducer/requirement/api";
import { NormalAvatar } from "@/components/Atoms";
import { motion } from "framer-motion";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";

interface IClassroomCardProps {
  item: IClassroomObject;
  index: number;
}

export const ClassroomCard: FC<IClassroomCardProps> = ({ item, index }) => {
  const [openModalClassroomDetail, setOpenModalClassroomDetail] =
    useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalClassroomDetail,
  });
  // HANDLE CALL API
  const addRequirementMutation = useMutationQueryAPI({
    action: createRequirement,
    queryKeyLog: ["subscribe-state"],
    successMsg: "The Request sent successfully!",
    errorMsg: "Fail to send the request",
  });
  const { currentUser } = useCurrentUserContext();
  const handleSubcribeClass = () => {
    if (!addRequirementMutation.isLoading) {
      addRequirementMutation.mutate({
        classroom: item,
        member: currentUser,
        registerDefense: false,
      });
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: index * 0.2 }}
        className="flex gap-5 justify-center rounded-lg bg-slate-100 relative items-center w-[24.5rem] shadow-lg"
      >
        <div className="pl-5">
          <NormalAvatar setSize="w-16" photoSrc={item?.lecturer?.photoSrc} />
        </div>
        <ClassroomContentCard
          setOpenModalClassroomDetail={setOpenModalClassroomDetail}
          openModalClassroomDetail={openModalClassroomDetail}
          handleSubcribeClass={handleSubcribeClass}
          item={item}
        />
        <span className="absolute left-0 bottom-0 right-[15rem] h-[2px] bg-green-700"></span>
      </motion.div>

      <ClassroomDetailModal
        item={item}
        setOpenModalClassroomDetail={setOpenModalClassroomDetail}
        openModalClassroomDetail={openModalClassroomDetail}
        handleSubcribeClass={handleSubcribeClass}
        modalClass={modalClass}
      />
    </>
  );
};
