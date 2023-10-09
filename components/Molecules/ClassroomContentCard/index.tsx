/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Button, ItemUserInfor, NormalAvatar } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";
import { STATE_LECTURER_CLASSROOM } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";

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
  const { subscribeState } = useSubscribeStateContext();
  const { currentUser } = useCurrentUser();
  const checkStatusWaiting = (classroom: IClassroomObject) => {
    if (Array.isArray(subscribeState)) {
      return subscribeState.some(
        (item: IMemberObject) => item.classroom.id === classroom.id
      );
    }
  };
  return (
    <>
      <div className="max-h-fit px-5 py-3 dark:border-none dark:shadow-lg dark:shadow-gray-600 relative">
        <div className="absolute -top-8 right-3">
          <NormalAvatar setSize="w-14" photoSrc={item?.lecturer?.photoSrc} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm uppercase text-gray-600 py-2">Information</p>
          <ul>
            <ItemUserInfor
              title="Major"
              content={item?.lecturer?.major}
              className="capitalize"
            />
            <ItemUserInfor title="Email" content={item?.lecturer?.email} />
            <ItemUserInfor title="Phone" content={item?.lecturer?.phone} />
          </ul>
          <p className="text-sm uppercase text-gray-600 py-2">Topics</p>
          {/* <TopicTag arrTopics={item?.topicTags} /> */}
        </div>
        {checkStatusWaiting(item) ? (
          <div className="flex justify-end items-center mt-auto">
            <Button
              title="Detail"
              setToggle={setOpenModalClassroomDetail}
              toggle={openModalClassroomDetail}
              otherType="detail"
              className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
            />
            <Button
              otherType="subscribe"
              title="Waiting..."
              className="hover:bg-[#165b31] w-28 border-none btn-sm bg-green-700 text-white"
            />
          </div>
        ) : (
          <div className="flex justify-end items-center mt-auto">
            <Button
              title="Detail"
              setToggle={setOpenModalClassroomDetail}
              toggle={openModalClassroomDetail}
              otherType="detail"
              className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
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
                      className="w-5 h-5"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                    <p className="text-sm normal-case font-medium">Opened</p>
                  </button>
                )}
                {currentUser.role === ROLE_ASSIGNMENT.STUDENT && (
                  <Button
                    id={item.id}
                    otherType="subscribe"
                    title="Subscribe"
                    handleActions={handleSubcribeClass}
                    className="hover:bg-[#165b31] w-28 border-none btn-sm bg-green-700 text-white"
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
