import { Button } from "@/components/Atoms";
import { PersonalInfor, TopicDescription } from "@/components/Molecules";
import { ITopicObject } from "@/interface/topic";
import { FC } from "react";

export interface IInforMemberModalProps {
  topic: ITopicObject;
  modalClass: string;
  setOpenMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
  openMemberModal: boolean;
}

export const InforMemberModal: FC<IInforMemberModalProps> = ({
  setOpenMemberModal,
  openMemberModal,
  modalClass,
  topic,
}) => {
  return (
    <dialog id="my_modal_5" className={modalClass}>
      <div className="w-6/12 bg-white p-5 h-fit shadow-2xl">
        <div>
          <div className="bg-green-700 p-5 flex items-center gap-3">
            <h4 className="uppercase text-white">Member information</h4>
            <div className="flex-grow h-[1px] bg-white"></div>
          </div>
          <div className="grid grid-cols-2 my-5">
            <PersonalInfor member={topic?.student} />
            <TopicDescription topic={topic} />
          </div>
          <div className="flex justify-end items-center">
            <Button
              setToggle={setOpenMemberModal}
              toggle={openMemberModal}
              type="button"
              title="Cancel"
              className="bg-transparent border-none hover:border-none hover:bg-transparent"
            />
            <Button
              type="button"
              title="Done"
              className="hover:bg-[#165b31] bg-[#018937] text-white"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};
