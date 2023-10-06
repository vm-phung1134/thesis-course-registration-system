/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Button, ItemUserInfor, NormalAvatar } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { IMemberObject } from "@/interface/member";

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
  const checkStatusWaiting = (classroom: IClassroomObject) => {
    if (Array.isArray(subscribeState)) {
      return subscribeState.some(
        (item: IMemberObject) => item.classroom.id === classroom.id
      );
    }
  };
  return (
    <>
      <div className="max-h-fit p-3 dark:border-none dark:shadow-lg dark:shadow-gray-600 relative">
        <div className="absolute -top-8 right-3">
          <NormalAvatar setSize="14" photoSrc={item?.lecturer?.photoSrc} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm uppercase text-gray-500 py-2">Information</p>
          <ul>
            <ItemUserInfor
              title="Major"
              content={item?.lecturer?.major}
              className="capitalize"
            />
            <ItemUserInfor title="Email" content={item?.lecturer?.email} />
            <ItemUserInfor title="Phone" content={item?.lecturer?.phone} />
          </ul>
          <p className="text-sm uppercase text-gray-500 py-2">Topics</p>
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
            <Button
              id={item.id}
              otherType="subscribe"
              title="Subscribe"
              handleSubcribeClass={handleSubcribeClass}
              className="hover:bg-[#165b31] w-28 border-none btn-sm bg-green-700 text-white"
            />
          </div>
        )}
      </div>
    </>
  );
};
