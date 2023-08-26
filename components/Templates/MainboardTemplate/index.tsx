import { ModalConfirm } from "@/components/Molecules";
import { Header, Sidebar } from "@/components/Organisms";
import classNames from "classnames";
import Head from "next/head";
import { useState, FC } from "react";

export interface IMainboardProps {
  children: React.ReactNode;
  title: string;
}

export const MainboardTemplate: FC<IMainboardProps> = ({ children, title }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModal,
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 bg-base-100">
          <Sidebar openModal={openModal} setOpenModal={setOpenModal} />
          <ModalConfirm
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalClass={modalClass}
            title="TCR Message!!!"
            message="Press ESC key or click the button below to close"
          />
          <div className="col-span-10 p-5">
            <Header />
            <div>{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
