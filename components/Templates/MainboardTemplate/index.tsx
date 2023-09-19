import { ModalConfirm } from "@/components/Molecules";
import {
  Header,
  SidebarLecturerView,
  SidebarStudentView,
} from "@/components/Organisms";
import { ROLE_ASSIGNMENT, useAuthContext } from "@/contexts/authContext";
import classNames from "classnames";
import Head from "next/head";
import { useState, FC } from "react";

export interface IMainboardProps {
  children: React.ReactNode;
  title: string;
}

export const MainboardTemplate: FC<IMainboardProps> = ({ children, title }) => {
  const { user } = useAuthContext();
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
        <div className="grid grid-cols-12 bg-base-100 dark:bg-[#0d0d0e] dark:text-[#dedede]">
          <div className="col-span-2 border-r h-screen dark:border-gray-500">
            {user?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <SidebarStudentView
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ) : (
              <SidebarLecturerView
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
          </div>

          <div className="col-span-10">
            <Header />
            <div className="px-5 h-full">{children}</div>
          </div>
          <ModalConfirm
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalClass={modalClass}
            title="TCR Message!!!"
            message="Press ESC key or click the button below to close"
          />
        </div>
      </main>
    </>
  );
};
