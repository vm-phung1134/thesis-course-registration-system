import { Button } from "@/components/Atoms";
import { FC } from "react";

export interface IModalConfirmProp {
  modalClass: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  openModal?: boolean;
  title: string;
  message: string;
  status?: string;
  typeButton?: string;
  underMessage?: string;
  action?: () => void;
  valueAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ModalConfirm: FC<IModalConfirmProp> = ({
  modalClass,
  setOpenModal,
  openModal,
  title,
  message,
  action,
  valueAction,
  underMessage,
  typeButton,
  status,
}) => {
  return (
    <dialog id="my_modal_1" className={modalClass}>
      <form method="dialog" className="bg-white p-7 shadow-lg w-4/12 rounded-2xl">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="py-4 font-medium">{message}</p>
        <p className="text-xs font-thin italic w-80">{`Noticed: ${underMessage}`}</p>
        <div className="modal-action">
          <Button
            setToggle={setOpenModal}
            toggle={openModal}
            title="cancel"
            className="bg-transparent border-none hover:border-none hover:bg-transparent"
          />
          <Button
            title="accept"
            otherType={typeButton}
            status={status}
            handleValueActions={valueAction}
            handleActions={action}
            setToggle={setOpenModal}
            toggle={openModal}
            className="hover:text-black bg-green-700 rounded-lg hover:bg-green-600 px-10 text-white"
          />
        </div>
      </form>
    </dialog>
  );
};
