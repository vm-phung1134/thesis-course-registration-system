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
import Link from "next/link";
import Image from "next/image";

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
  const { authClassroomState } = useClassroomStateContext();
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
      <h3 className="text-sm font-medium capitalize">
        Thesis graduation - CT550
      </h3>
      <h4 className="text-[24px] font-semibold uppercase">{lecturer?.name}</h4>
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-green-700 my-1">
          Major / {lecturer?.major}
        </h5>
        <button className="flex gap-2 px-2 py-1 text-sm items-center">
          <svg
            className="w-3 h-3"
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
      <ul>
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
          {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
            <>
              {authClassroomState.status === STATE_LECTURER_CLASSROOM.LOCK ? (
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
                  <p className="text-xs">Locked</p>
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
                  <p className="text-xs">Opening</p>
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
              <button className="btn border-none hover:border-none capitalize bg-transparent hover:bg-transparent">
                <Image
                  width={40}
                  height={40}
                  alt="icon-message"
                  src={"https://cdn-icons-gif.flaticon.com/6569/6569164.gif"}
                />
                <p className="text-xs">Locked</p>
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
