import { FC } from "react";
import { Avatar, Button, ItemUserInfor, TopicTag } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";

interface IClassroomContentCardProps {
  item: IClassroomObject;
  setOpenModalClassroomDetail: React.Dispatch<React.SetStateAction<boolean>>;
  openModalClassroomDetail: boolean;
}

export const ClassroomContentCard: FC<IClassroomContentCardProps> = ({
  item,
  setOpenModalClassroomDetail,
  openModalClassroomDetail,
}) => {
  return (
    <>
      <div className="max-h-fit p-3 border dark:border-none dark:shadow-lg dark:shadow-gray-600 relative">
        <div className="absolute -top-8 right-3">
          <Avatar
            widthStr="w-16"
            srcImg="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm uppercase text-gray-500 py-2">Information</p>
          <ul>
            <ItemUserInfor
              title="Major"
              content={item.lecturer.major || ""}
              className="capitalize"
            />
            <ItemUserInfor title="Email" content={item.lecturer.email || ""} />
            <ItemUserInfor title="Phone" content={item.lecturer.phone || ""} />
          </ul>
          <p className="text-sm uppercase text-gray-500 py-2">Topics</p>
          <TopicTag arrTopics={item.topicTags} />
        </div>
        <div className="flex justify-end mt-6 items-center">
          <Button
            title="Detail"
            setToggle={setOpenModalClassroomDetail}
            toggle={openModalClassroomDetail}
            otherType="detail"
            className="bg-transparent dark:text-green-500 border-none hover:border-none hover:bg-transparent"
          />
          <Button
            id={item.id}
            otherType="subscribe"
            title="Subscribe"
            className="hover:bg-[#165b31] border-none btn-sm bg-[#018937] text-white"
          />
        </div>
      </div>
    </>
  );
};
