import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface IModalConfirmProp {
  modalClass: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
  title: string;
  message: string;
}

export const ModalConfirm: FC<IModalConfirmProp> = ({
  modalClass,
  setOpenModal,
  openModal,
  title,
  message,
}) => {
  return (
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="bg-white p-7 shadow-lg">
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
            className="hover:text-black bg-[#018937] text-white"
          />
        </div>
      </form>
    </dialog>
  );
};
