import { FC } from "react";
import { IClassroomObject } from "@/interface/classroom";
import { useState } from "react";
import classNames from "classnames";
import {
  ClassroomContentCard,
  ClassroomDetailModal,
} from "@/components/Molecules";
import { createRequirement } from "@/redux/reducer/requirement/api";
import { IMemberObject } from "@/interface/member";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NormalAvatar } from "@/components/Atoms";
import { motion } from "framer-motion";

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
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const addRequirementMutation = useMutation(
    (postData: Omit<IMemberObject, "id">) => {
      return dispatch(createRequirement(postData))
        .unwrap()
        .then((data) => {
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          toast.error(error?.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 3000,
          });
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subscribe-state"]);
      },
    }
  );
  const { currentUser } = useCurrentUser();
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
