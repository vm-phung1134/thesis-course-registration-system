import { Button } from "@/components/Atoms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { INITIATE_CLASSROOM, STATE_LECTURER_CLASSROOM } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { IAuthObject } from "@/interface/auth";
import { IClassroomObject } from "@/interface/classroom";
import { unsubscribeState } from "@/redux/reducer/auth/api";
import { getClassroom, updateClassroom } from "@/redux/reducer/classroom/api";
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, MouseEvent, useState } from "react";
import { ModalConfirm } from "..";
import classNames from "classnames";

export interface ICardLecturerInClassProps {
  lecturer: IAuthObject;
}

export const CardLecturerInClass: FC<ICardLecturerInClassProps> = ({
  lecturer,
}) => {
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
  const {authClassroomState} = useClassroomStateContext()
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const deleteMutation = useMutation(
    (postData: IAuthObject) => {
      return new Promise((resolve, reject) => {
        dispatch(unsubscribeState(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["member"]);
      },
    }
  );
  const handleUnsubscribeState = () => {
    deleteMutation.mutate(currentUser);
  };

  // HANDLE LOCK CLASSROOM FOR LECTURER
  const updateMutation = useMutation(
    (postData: IClassroomObject) => {
      return new Promise((resolve, reject) => {
        dispatch(updateClassroom(postData))
          .unwrap()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["classroom"]);
      },
    }
  );
  const handleOpenModal = () => {
    setOpenLockClass(!openLockClass);
  };
  const handleOpenModalLeave = () => {
    setOpenLeaveClass(!openLeaveClass);
  };
  const handleLockClassroom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status_class: string = e.currentTarget.value;
    updateMutation.mutate({ ...authClassroomState, status: status_class });
  };

  return (
    <>
      <h3 className="text-sm uppercase">Thesis graduation - CT550</h3>
      <h4 className="text-[24px] font-semibold uppercase">{lecturer?.name}</h4>
      <h5 className="font-medium text-green-700">Major: {lecturer?.major}</h5>
      <ul>
        <li className="text-base flex gap-2">
          <span className="">Email: {lecturer?.email}</span>
        </li>
        <li className="text-base flex gap-2">
          <span className="">Phone: {lecturer?.phone}</span>
        </li>
      </ul>
      <div className="flex justify-end items-end">
        <div className="flex gap-5">
          {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
            <>
              {authClassroomState.status === STATE_LECTURER_CLASSROOM.LOCK ? (
                <button
                  value="UN_LOCK"
                  onClick={handleOpenModal}
                  className="btn rounded-none bg-transparent border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="text-sm normal-case">Locked</p>
                </button>
              ) : (
                <button
                  value="LOCK"
                  onClick={handleOpenModal}
                  className="btn rounded-none outline-none hover:outline-none bg-transparent border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                  </svg>
                  <p className="text-sm normal-case">Opened</p>
                </button>
              )}
            </>
          )}
          {currentUser.role === ROLE_ASSIGNMENT.STUDENT &&
            authClassroomState.status === STATE_LECTURER_CLASSROOM.UN_LOCK && (
              <Button
                handleActions={handleOpenModalLeave}
                otherType="subscribe"
                className="bg-transparent hover:bg-red-600 hover:text-white border-red-600 text-red-600 font-normal capitalize"
                title="Leave Group"
              />
            )}
          {currentUser.role === ROLE_ASSIGNMENT.STUDENT &&
            authClassroomState.status === STATE_LECTURER_CLASSROOM.LOCK && (
              <button className="btn rounded-none bg-transparent border border-red-600 hover:bg-red-600 hover:text-white text-red-600 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p className="text-sm normal-case">Locked</p>
              </button>
            )}
        </div>
        <ModalConfirm
          modalClass={modalClassLockClass}
          setOpenModal={setOpenLockClass}
          openModal={openLockClass}
          valueAction={handleLockClassroom}
          status={authClassroomState.status}
          typeButton="value"
          title="Message!!!"
          message={
            authClassroomState.status === STATE_LECTURER_CLASSROOM.LOCK
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
    </>
  );
};
