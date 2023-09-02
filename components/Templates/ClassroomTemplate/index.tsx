import { Avatar, MenuClassroom } from "@/components/Atoms";
import { CreatePostForm, ModalConfirm } from "@/components/Molecules";
import {
  Header,
  SidebarLecturerView,
  SidebarStudentView,
} from "@/components/Organisms";
import classNames from "classnames";
import Head from "next/head";
import { useState, FC } from "react";
import { DATA_MENU_CLASSROOM } from "./mock-data";
import { ROLE_ASSIGNMENT, useAuthContext } from "@/contexts/authContext";

export interface IClassroomProps {
  children: React.ReactNode;
  title: string;
}

const CardLecturerClass = () => {
  return (
    <>
      <h3 className="text-md uppercase">Thesis graduation - CT550</h3>
      <h4 className="text-[26px] font-semibold uppercase">Le Huynh Quoc Bao</h4>
      <h5 className="font-medium text-green-700">
        Major: Sercurity Information
      </h5>
      <ul>
        <li className="text-base flex gap-2">
          <span className="">lhqbao@ctu.edu.vn</span>
        </li>
        <li className="text-base flex gap-2">
          <span className="">0953812461</span>
        </li>
      </ul>
      <div className="flex justify-end items-end">
        <button className="btn rounded-none bg-transparent border-red-500 text-red-600 font-normal capitalize">
          Leave Group
        </button>
      </div>
    </>
  );
};

const CodeClass = () => {
  return (
    <div className="flex justify-center flex-col items-end">
      <div className="border w-fit p-2">
        <div className="flex justify-between items-center">
          <small>Code</small>
          <button>...</button>
        </div>
        <p className="font-medium text-md px-5 py-2">zggbvj3</p>
      </div>
    </div>
  );
};

export const ClassroomTemplate: FC<IClassroomProps> = ({ children, title }) => {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCreatePostModal, setCreatePostModal] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModal,
  });
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreatePostModal,
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 bg-base-100">
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
          <div className="col-span-10">
            <Header />
            <div className="px-5">
              <div className="grid grid-cols-12 gap-4 py-5">
                <div className="col-span-4 p-5 border">
                  <CardLecturerClass />
                </div>
                <div className="bg-gray-800 col-span-8 h-fit w-full text-white">
                  <div className="p-5">
                    <MenuClassroom listMenu={DATA_MENU_CLASSROOM} />
                    <div className="flex justify-center mt-5 gap-4 items-center cursor-pointer">
                      <Avatar
                        widthStr="w-10"
                        srcImg="https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                      />
                      <p
                        onClick={() => setCreatePostModal(!openCreatePostModal)}
                        className="hover:text-orange-600 ease-in-out duration-200"
                      >
                        Write a message for your class today
                      </p>
                    </div>
                    <CodeClass />
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
          <ModalConfirm
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalClass={modalClass}
            title="TCR Message!!!"
            message="Press ESC key or click the button below to close"
          />
          <dialog id="my_modal_3" className={modalClassPost}>
            <div className="w-5/12 bg-white p-5 h-fit shadow-2xl">
              <CreatePostForm
                setToggleForm={setCreatePostModal}
                toggleForm={openCreatePostModal}
              />
            </div>
          </dialog>
        </div>
      </main>
    </>
  );
};
