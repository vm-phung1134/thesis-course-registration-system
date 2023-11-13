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
      <div className="w-6/12 bg-white py-5 px-8 h-fit shadow-2xl rounded-2xl">
        <div>
          <h4 className="font-bold text-xl capitalize">Requirement information</h4>
          <div className="grid grid-cols-2 my-5">
            <PersonalInfor member={topic?.student} />
            <TopicDescription topic={topic} />
          </div>
          <div className="flex justify-end items-center">
            <Button
              setToggle={setOpenMemberModal}
              toggle={openMemberModal}
              type="button"
              title="Close"
              className="hover:bg-green-700 rounded-lg px-5 bg-green-700 text-white"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};
