/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Button } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { STATE_AUTH_CLASSROOM, STATE_LECTURER_CLASSROOM } from "@/data";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/store";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { useCurrentUserContext } from "@/contexts/currentUserContext";

interface IClassroomContentCardProps {
  item: IClassroomObject;
  setOpenModalClassroomDetail: React.Dispatch<React.SetStateAction<boolean>>;
  openModalClassroomDetail: boolean;
  handleSubcribeClass: () => void;
}

export const ClassroomContentCard: FC<IClassroomContentCardProps> = ({
  item,
  setOpenModalClassroomDetail,
  openModalClassroomDetail,
  handleSubcribeClass,
}) => {
  const dispatch = useAppDispatch();
  const { subscribeState } = useSubscribeStateContext();
  const { currentUser } = useCurrentUserContext();
  const checkStatusWaiting = (classroom: IClassroomObject) => {
    if (Array.isArray(subscribeState)) {
      return subscribeState.some(
        (item: IMemberObject) => item.classroom.id === classroom.id
      );
    }
  };
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["classroom-members", item],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(item));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <div className="flex flex-col gap-2 py-2 w-full pr-3">
        <div>
          <h4 className="font-bold text-base capitalize">
            {item?.lecturer?.name}
          </h4>
          <div className="flex flex-col tracking-wider">
            <p className="text-sm flex gap-2">
              <span className="font-normal">{item?.lecturer?.email}</span>
            </p>
            <div className="text-sm flex gap-2 items-center">
              <p className="font-normal">
                {`${members?.length} / ${item?.quantityStudent} Available`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <i className="fa-regular fa-envelope"></i>
            <i className="fa-regular fa-message"></i>
          </div>
          {checkStatusWaiting(item) ? (
            <div className="flex justify-end items-center mt-auto">
              <Button
                title="Detail"
                setToggle={setOpenModalClassroomDetail}
                toggle={openModalClassroomDetail}
                otherType="detail"
                className="bg-transparent dark:text-green-700 border-none rounded-lg hover:border-none hover:bg-transparent"
              />
              <Button
                otherType="subscribe"
                title="Waiting ..."
                className="hover:bg-[#165b31] w-28 border-none rounded-lg btn-sm bg-green-700 text-white"
              />
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <Button
                title="Detail"
                setToggle={setOpenModalClassroomDetail}
                toggle={openModalClassroomDetail}
                otherType="detail"
                className="bg-transparent btn-sm dark:text-green-700 border-none hover:border-none hover:bg-transparent"
              />
              {item.status === STATE_LECTURER_CLASSROOM.LOCK ? (
                <button className="btn btn-sm rounded-none bg-transparent border-none hover:bg-transparent hover:border-none font-normal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <p className="text-sm normal-case font-medium">Locked</p>
                </button>
              ) : (
                <>
                  {currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
                    <button className="btn btn-sm rounded-none text-green-700 bg-transparent border-none hover:bg-transparent hover:border-none font-normal">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </svg>
                      <p className="text-sm normal-case font-medium">Opening</p>
                    </button>
                  )}
                  {currentUser.role === ROLE_ASSIGNMENT.STUDENT &&
                    members.length < item.quantityStudent && (
                      <Button
                        id={item.id}
                        otherType="subscribe"
                        title="Subscribe"
                        handleActions={handleSubcribeClass}
                        className="hover:bg-[#165b31] rounded-lg w-28 border-none btn-sm bg-green-700 text-white"
                      />
                    )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
