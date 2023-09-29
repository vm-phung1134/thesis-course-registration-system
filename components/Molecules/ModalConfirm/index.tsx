import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface IModalConfirmProp {
  modalClass: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
  title: string;
  message: string;
  action?: () => void;
}

export const ModalConfirm: FC<IModalConfirmProp> = ({
  modalClass,
  setOpenModal,
  openModal,
  title,
  message,
  action,
}) => {
  return (
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="bg-white p-7 shadow-lg w-4/12">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4 text-[15px]">{message}</p>
        <div className="modal-action">
          <Button
            setToggle={setOpenModal}
            toggle={openModal}
            title="cancel"
            className="bg-transparent border-none hover:border-none hover:bg-transparent"
          />
          <Button
            title="accept"
            otherType="subscribe"
            handleSubcribeClass={action}
            className="hover:text-black bg-green-700 hover:bg-green-600 px-10 text-white"
          />
        </div>
      </form>
    </dialog>
  );
};
