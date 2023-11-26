import { Button, ItemUserInfor, NormalAvatar } from "@/components/Atoms";
import { STATE_LECTURER_CLASSROOM } from "@/data";
import { IClassroomObject } from "@/interface/classroom";
import { IMemberObject } from "@/interface/member";
import { getAllMemberClassroom } from "@/redux/reducer/member/api";
import { useAppDispatch } from "@/redux/store";
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
    queryKey: ["classroom-members", item],
    queryFn: async () => {
      const action = await dispatch(getAllMemberClassroom(item));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <dialog id="my_modal_7" className={modalClass}>
      <div className="w-6/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
        <h4 className="font-bold text-xl capitalize">Instructor information</h4>
        <div className="grid grid-cols-12 gap-2 mt-3 text-sm">
          <div className="col-span-5">
            <div className="flex items-center gap-3 bg-slate-100 p-3 rounded-lg">
              <NormalAvatar
                setSize="w-12"
                photoSrc={item?.lecturer?.photoSrc}
              />
              <div>
                <h4 className="font-bold text-[16px] capitalize">
                  {item?.lecturer?.name}
                </h4>
                <p className="text-xs uppercase font-medium">
                  {item?.classCourse}
                </p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-green-700 mt-3 py-2">Contact</h5>
              <ul className="border rounded-xl p-3">
                <ItemUserInfor title="Email" content={item?.lecturer?.email} />
                <div className="flex justify-between my-3">
                  <ItemUserInfor
                    title="Department"
                    content={item?.lecturer?.class}
                  />
                  <ItemUserInfor
                    title="Major"
                    content={item?.lecturer?.major}
                    className="capitalize"
                  />
                </div>
                <ItemUserInfor title="Phone" content={item?.lecturer?.phone} />
              </ul>
            </div>
          </div>
          <div className="col-span-7">
            <h5 className="font-medium text-green-700 mb-2">
              Classroom information
            </h5>
            <div className="flex flex-col border rounded-xl p-3">
              <ItemUserInfor
                title="Status classroom"
                content={
                  item?.status === STATE_LECTURER_CLASSROOM.LOCK
                    ? "Locked"
                    : "Opening"
                }
              />
              <div className="flex gap-10 my-3">
                <ItemUserInfor
                  title="Total members"
                  content={`${item?.quantityStudent} members`}
                />
                <ItemUserInfor
                  title="Available"
                  content={`${item?.quantityStudent - members.length} members`}
                />
              </div>
            </div>
            <h5 className="font-medium text-green-700 my-2">Requirements</h5>
            <ul className="mb-4 border rounded-xl p-3">
              <li>You have to fill out your information</li>
              <li>Register topic you are going to do</li>
              <li>{`GPA > 2.8`}</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button
            title="Back to mainboard"
            setToggle={setOpenModalClassroomDetail}
            toggle={openModalClassroomDetail}
            otherType="detail"
            className="bg-transparent dark:text-green-700 border-none hover:border-none hover:bg-transparent"
          />
          <Button
            id={item.id}
            otherType="subscribe"
            title="Subscribe"
            className="hover:bg-[#165b31] border-none rounded-lg px-10 bg-green-700 text-white"
          />
        </div>
      </div>
    </dialog>
  );
};
