import { Avatar, Button, ItemUserInfor, TopicTag } from "@/components/Atoms";
import { IClassroomObject } from "@/interface/classroom";
import { IMemberObject } from "@/interface/member";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { useAppDispatch } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useQuery } from "@tanstack/react-query";
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
  const dispatch = useAppDispatch();
  const { data: members } = useQuery<IMemberObject[]>({
    queryKey: ["members"],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(item));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <dialog id="my_modal_7" className={modalClass}>
      <div className="w-6/12 bg-white p-5 h-fit shadow-2xl">
        <div className="bg-green-700 p-5 flex items-center gap-3 text-sm">
          <h4 className="uppercase text-white">Classroom information</h4>
          <div className="flex-grow h-[1px] bg-white"></div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-3 text-sm">
          <div className="col-span-4 p-3">
            <div className="flex items-center gap-3">
              <Avatar
                widthStr="w-10"
                srcImg="https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
              <div>
                <p className="text-xs uppercase font-medium">{item?.codeCourse}</p>
                <h4 className="uppercase font-medium ">
                  {convertToUnaccentedString(item?.title)}
                </h4>
              </div>
            </div>
            <div>
              <p className="uppercase text-xs text-gray-500 mt-3 py-2">
                Profile
              </p>
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
          </div>
          <div className="col-span-8 border-l px-5">
            <div className="flex gap-10">
              <div className="h-1/2 flex flex-col justify-end">
                <p className="uppercase  text-xs text-gray-500 py-2">
                  Classroom Informations
                </p>
                <ItemUserInfor title="Course" content={"HK1_2023"} />
                <ItemUserInfor title="Total members" content={"15 members"} />
                <ItemUserInfor
                  title="Available"
                  content={`${15 - members.length} members`}
                />
              </div>

              <div>
                <p className="uppercase text-gray-500 py-2 text-xs">Topics</p>
                <TopicTag arrTopics={item.topicTags} />
              </div>
            </div>
            <p className="uppercase text-gray-500 text-xs py-2">Requirements</p>
            <ul className="list-disc ml-5 mb-4">
              <li>You have to fill out your information</li>
              <li>Register topic you are going to do</li>
              <li>{`GPA > 2.8`}</li>
            </ul>
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
