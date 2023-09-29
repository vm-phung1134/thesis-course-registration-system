import { Avatar, Button, ItemUserInfor, TopicTag } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { FC } from "react";

export interface IClassroomDetailModalProps {
  item: IClassroomObject;
  setOpenModalClassroomDetail: React.Dispatch<React.SetStateAction<boolean>>;
  openModalClassroomDetail: boolean;
  modalClass: string;
  handleSubcribeClass: () => void;
}

export const ClassroomDetailModal: FC<IClassroomDetailModalProps> = ({
  item,
  setOpenModalClassroomDetail,
  openModalClassroomDetail,
  modalClass,
}) => {
  return (
    <dialog id="my_modal_7" className={modalClass}>
      <div className="w-6/12 bg-white p-5 h-fit shadow-2xl">
        <div className="bg-green-700 p-5 flex items-center gap-3 text-sm">
          <h4 className="uppercase text-white">Classroom information</h4>
          <div className="flex-grow h-[1px] bg-white"></div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-3 text-sm">
          <div className="col-span-4 shadow-lg p-3">
            <div className="flex items-center gap-3">
              <Avatar
                widthStr="w-10"
                srcImg="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <div>
                <p className="text-xs uppercase bg-red-700 text-white w-fit px-3">
                  CT550
                </p>
                <h4 className="uppercase font-medium ">Le huynh quoc bao</h4>
              </div>
            </div>
            <div className="h-1/2 flex flex-col justify-end">
              <ItemUserInfor title="Course" content={"HK1_2023"} />
              <ItemUserInfor title="Total members" content={"15 members"} />
              <ItemUserInfor title="Available" content={"5 members"} />
            </div>
          </div>
          <div className="col-span-8 border-l px-5">
            <p className="text-sm uppercase text-gray-500">Requirements</p>
            <ul className="list-disc ml-5 mb-4">
              <li>You have to fill out your information</li>
              <li>Register topic you are going to do</li>
              <li>{`GPA > 2.8`}</li>
            </ul>
            <div className="flex gap-10">
              <div>
                <p className="uppercase text-gray-500">Information</p>
                <ul>
                  <ItemUserInfor
                    title="Major"
                    content={item.lecturer.major || ""}
                    className="capitalize"
                  />
                  <ItemUserInfor
                    title="Email"
                    content={item.lecturer.email || ""}
                  />
                  <ItemUserInfor
                    title="Phone"
                    content={item.lecturer.phone || ""}
                  />
                </ul>
              </div>
              <div>
                <p className="text-sm uppercase text-gray-500 py-2">Topics</p>
                <TopicTag arrTopics={item.topicTags} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button
            title="Cancel"
            setToggle={setOpenModalClassroomDetail}
            toggle={openModalClassroomDetail}
            otherType="detail"
            className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
          />
          <Button
            id={item.id}
            otherType="subscribe"
            title="Subscribe"
            className="hover:bg-[#165b31] border-none btn-sm bg-green-700 text-white"
          />
        </div>
      </div>
    </dialog>
  );
};
