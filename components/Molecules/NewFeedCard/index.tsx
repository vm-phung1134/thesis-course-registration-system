import { NormalAvatar } from "@/components/Atoms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useMutationQueryAPI } from "@/hooks/useMutationAPI";
import { IExerciseObject } from "@/interface/exercise";
import { deleteExercise } from "@/redux/reducer/exercise/api";
import { convertDateTime, convertDateTimeFromString } from "@/utils/covertDate";
import classNames from "classnames";
import { FC, useState } from "react";
import { ModalConfirm } from "..";

export interface INewFeedCardProps {
  task: IExerciseObject;
  handleOpenTaskModal: (task: IExerciseObject) => void;
  handleOpenEditEx?: (exercise: IExerciseObject) => void;
}

export const NewFeedCard: FC<INewFeedCardProps> = ({
  task,
  handleOpenTaskModal,
  handleOpenEditEx,
}) => {
  const { currentUser } = useCurrentUserContext();
  // HANDLE DELETE EXERCISE
  const [openDelExModal, setOpenDelExModal] = useState<boolean>(false);
  const modalClassDelEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openDelExModal,
  });
  const deleteMutation = useMutationQueryAPI({
    action: deleteExercise,
    queryKeyLog: ["classroom-exercises"],
    successMsg: "You just delete exercise successfully!",
    errorMsg: "Fail to delete a exercise!",
  });
  const handleDelEx = () => {
    deleteMutation.mutate(task);
  };
  return (
    <>
      <div className="rounded-t-xl px-5 py-3 text-sm relative">
        <div className="-left-72 top-0 bottom-0 w-full h-full bg-green-700 absolute -skew-x-[40deg]"></div>
        <div className="flex justify-between items-center relative">
          <div className="flex gap-2">
            <NormalAvatar setSize="w-11" photoSrc={task?.author?.photoSrc} />
            <div className="flex flex-col">
              <div
                onClick={() => handleOpenTaskModal(task)}
                className="cursor-pointer ease-in-out duration-300 text-white"
              >
                <div className="flex gap-10 items-center">
                  <p className="text-xs">
                    {convertDateTimeFromString(task?.updateAt || "")}
                  </p>
                </div>
                <span className="font-medium text-sm">
                  {task?.author?.name}
                </span>{" "}
                has been added a new report progress
              </div>
            </div>
          </div>
          <div className="flex justify-end flex-col items-end gap-1">
            <div>
              {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="px-2 font-bold">
                    ...
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu shadow bg-base-100 w-32 text-xs rounded-none"
                  >
                    <li onClick={() => handleOpenEditEx?.(task)}>
                      <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                        Edit
                      </a>
                    </li>
                    <li onClick={() => setOpenDelExModal(!openDelExModal)}>
                      <a className="rounded-none dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-green-600">
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="font-medium text-xs text-green-700 capitalize">
              report progress
            </p>
            <div className="flex gap-3 text-xs font-medium items-center text-red-500">
              <p>{convertDateTime(task?.deadline)}</p>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        modalClass={modalClassDelEx}
        setOpenModal={setOpenDelExModal}
        openModal={openDelExModal}
        action={handleDelEx}
        typeButton="subscribe"
        underMessage="Once you delete this exercise if will be gone forever"
        title="Message!!!"
        message="Are you sure that you want to delete this exercise?"
      />
    </>
  );
};
