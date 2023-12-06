import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  INITIATE_CLASSROOM,
  INITIATE_MEMBER,
  STATE_LECTURER_CLASSROOM,
} from "@/data";
import { IAuthObject } from "@/interface/auth";
import { updateClassroom } from "@/redux/reducer/classroom/api";
import { FC, useState } from "react";
import { ModalConfirm } from "..";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { getMember, leaveClassroom } from "@/redux/reducer/member/api";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { IMemberObject } from "@/interface/member";
import { useLanguageContext } from "@/contexts/languageContext";

export interface ICardLecturerInClassProps {
  lecturer: IAuthObject;
}

export const CardLecturerInClass: FC<ICardLecturerInClassProps> = ({
  lecturer,
}) => {
  const { t } = useLanguageContext();
  const dispatch = useAppDispatch();
  const [openLockClass, setOpenLockClass] = useState<boolean>(false);
  const modalClassLockClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openLockClass,
  });
  const [openLeaveClass, setOpenLeaveClass] = useState<boolean>(false);
  const modalClassLeaveClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openLeaveClass,
  });
  const { authClassroomState } = useClassroomStateContext();
  const { currentUser } = useCurrentUserContext();
  const deleteMutation = useMutationQueryAPI({
    action: leaveClassroom,
    queryKeyLog: ["clasroom-members"],
    successMsg: "You have exited the thesis group!!!",
    errorMsg: "Fail to exit the thesis group!!",
  });
  const { data: member } = useQuery<IMemberObject>({
    queryKey: ["get-one-member", currentUser],
    queryFn: async () => {
      const action = await dispatch(getMember(currentUser));
      return action.payload || INITIATE_MEMBER;
    },
    initialData: INITIATE_MEMBER,
  });
  const handleUnsubscribeState = () => {
    if (member.id) {
      deleteMutation.mutate(member.id);
    }
  };

  // HANDLE LOCK CLASSROOM FOR LECTURER
  const updateMutation = useMutationQueryAPI({
    action: updateClassroom,
    queryKeyLog: ["get-one-classroom"],
    successMsg: "Classroom state has changed!!!",
    errorMsg: "Fail to change state the classroom!!",
  });
  const handleOpenModal = () => {
    setOpenLockClass(!openLockClass);
  };
  const handleOpenModalLeave = () => {
    setOpenLeaveClass(!openLeaveClass);
  };
  const handleLockClassroom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status_class: string = e.currentTarget.value;
    updateMutation.mutate({
      id: authClassroomState?.id,
      lecturerID: authClassroomState?.lecturer.id,
      classCourse: authClassroomState?.classCourse,
      quantityStudent: authClassroomState?.quantityStudent,
      status: status_class,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h3 className="text-sm font-medium capitalize tracking-wider">
        {t.classroom_item1}
      </h3>
      <h4 className="text-[24px] font-semibold uppercase">{lecturer?.name}</h4>
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-green-700 my-1 capitalize">
          Major / {lecturer?.major}
        </h5>
        <button className="flex gap-2 px-2 py-1 text-sm items-center">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
            <Link href={"/account/account-lecturer"}>
              <p>Edit</p>
            </Link>
          )}
        </button>
      </div>
      <ul className="text-sm flex flex-col gap-1">
        <li>
          <p className="flex gap-3 items-center">
            <i className="fa-regular fa-envelope"></i>
            <span>{lecturer?.email}</span>
          </p>
        </li>
        <li>
          <p className="flex gap-3 items-center">
            <i className="fa-solid fa-mobile"></i>
            <span>{`(84+) ${lecturer?.phone}`}</span>
          </p>
        </li>
      </ul>
      <div className="flex justify-end items-end">
        <div className="flex gap-5">
          {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
            <>
              {authClassroomState?.status === STATE_LECTURER_CLASSROOM.LOCK ? (
                <button
                  value="UN_LOCK"
                  onClick={handleOpenModal}
                  className="btn border-none hover:border-none capitalize bg-transparent hover:bg-transparent"
                >
                  <Image
                    width={40}
                    height={40}
                    alt="icon-message"
                    src={"https://cdn-icons-gif.flaticon.com/6569/6569164.gif"}
                  />
                  <p className="text-xs">{t.classroom_item_clock} </p>
                </button>
              ) : (
                <button
                  value="LOCK"
                  onClick={handleOpenModal}
                  className="btn border-none hover:border-none capitalize bg-transparent hover:bg-transparent"
                >
                  <Image
                    width={40}
                    height={40}
                    alt="icon-message"
                    src={
                      "https://cdn-icons-gif.flaticon.com/10352/10352708.gif"
                    }
                  />
                  <p className="text-xs">{t.classroom_item_open}</p>
                </button>
              )}
            </>
          )}
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT &&
            authClassroomState?.status === STATE_LECTURER_CLASSROOM.UN_LOCK && (
              <button
                onClick={handleOpenModalLeave}
                className="ml-5 mt-5 py-2 px-5 text-xs rounded-lg dark:bg-red-600 dark:text-white bg-white border border-red-500 transform ease-linear duration-300 text-red-600 hover:bg-red-600 hover:text-white font-bold -skew-x-[20deg]"
              >
                <p className="skew-x-12">{t.classroom_item_unsub}</p>
              </button>
            )}
          {currentUser?.role === ROLE_ASSIGNMENT.STUDENT &&
            authClassroomState?.status === STATE_LECTURER_CLASSROOM.LOCK && (
              <button className="btn border-none hover:border-none capitalize bg-transparent hover:bg-transparent">
                <Image
                  width={40}
                  height={40}
                  alt="icon-message"
                  src={"https://cdn-icons-gif.flaticon.com/6569/6569164.gif"}
                />
                <p className="text-xs">{t.classroom_item_clock}</p>
              </button>
            )}
        </div>
        <ModalConfirm
          modalClass={modalClassLockClass}
          setOpenModal={setOpenLockClass}
          openModal={openLockClass}
          valueAction={handleLockClassroom}
          status={authClassroomState?.status}
          typeButton="value"
          title="Message!!!"
          message={
            authClassroomState?.status === STATE_LECTURER_CLASSROOM.LOCK
              ? "Do you want to open the classroom"
              : "Do you want to lock the classroom"
          }
          underMessage="If you lock the room while students can not send requirement or leave to classroom"
        />
        <ModalConfirm
          modalClass={modalClassLeaveClass}
          setOpenModal={setOpenLeaveClass}
          openModal={openLeaveClass}
          action={handleUnsubscribeState}
          title="Message!!!"
          typeButton="subscribe"
          message={"Do you want to leave this classroom"}
          underMessage="You will added into blacklist of lecturer"
        />
      </div>
    </motion.div>
  );
};
