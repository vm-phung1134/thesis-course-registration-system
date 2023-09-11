import { Avatar, Button, MenuClassroom } from "@/components/Atoms";
import {
  CountDown,
  CreateExerciseForm,
  CreatePostForm,
  ModalConfirm,
} from "@/components/Molecules";
import {
  Header,
  SidebarLecturerView,
  SidebarStudentView,
} from "@/components/Organisms";
import classNames from "classnames";
import Head from "next/head";
import { useState, FC, useEffect } from "react";
import { DATA_LIST_OPTIONS, DATA_MENU_CLASSROOM } from "./mock-data";
import { ROLE_ASSIGNMENT, useAuthContext } from "@/contexts/authContext";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";

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
        <Button
          className="bg-transparent border-red-500 text-red-600 font-normal capitalize"
          title="Leave Group"
        />
      </div>
    </>
  );
};

const CodeClass = () => {
  return (
    <div className="border w-fit p-2">
      <div className="flex justify-between items-center">
        <small>Code</small>
        <button>...</button>
      </div>
      <p className="font-medium text-md px-5 py-2">zggbvj3</p>
    </div>
  );
};

export const ClassroomTemplate: FC<IClassroomProps> = ({ children, title }) => {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOptionItem | ICategoryObject>(
    DATA_LIST_OPTIONS[0]
  );
  const [openCreatePostModal, setCreatePostModal] = useState<boolean>(false);
  const modalClass = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModal,
  });
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreatePostModal,
  });
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // useEffect(() => {
  //   const calculateTimeLeft = () => {
  //     const countdownDate = new Date("2023-10-01T00:00:00Z").getTime();
  //     const now = new Date().getTime();
  //     const difference = countdownDate - now;

  //     setTimeLeft(Math.floor(difference / 1000));
  //   };
  //   const timer = setInterval(calculateTimeLeft, 1000);
  //   return () => clearInterval(timer);
  // }, []);
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
                    <div className="mt-5 flex flex-col items-center gap-3">
                      <div className="flex justify-center gap-4 items-center cursor-pointer">
                        <Avatar
                          widthStr="w-10"
                          srcImg={
                            user?.photoSrc ||
                            "https://images.pexels.com/photos/39866/entrepreneur-startup-start-up-man-39866.jpeg?auto=compress&cs=tinysrgb&w=600"
                          }
                        />
                        {user?.role === ROLE_ASSIGNMENT.STUDENT ? (
                          <CountDown timeLeft={timeLeft} />
                        ) : (
                          <p
                            onClick={() =>
                              setCreatePostModal(!openCreatePostModal)
                            }
                            className="hover:text-orange-600 ease-in-out duration-200"
                          >
                            Write a message for your class today
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-end justify-end">
                      <CodeClass />
                    </div>
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
              {selected === DATA_LIST_OPTIONS[0] ? (
                <CreateExerciseForm
                  setToggleForm={setCreatePostModal}
                  toggleForm={openCreatePostModal}
                  selected={selected}
                  setSelected={setSelected}
                  options={DATA_LIST_OPTIONS}
                />
              ) : (
                <CreatePostForm
                  selected={selected}
                  setSelected={setSelected}
                  setToggleForm={setCreatePostModal}
                  toggleForm={openCreatePostModal}
                  options={DATA_LIST_OPTIONS}
                />
              )}
            </div>
          </dialog>
        </div>
      </main>
    </>
  );
};
