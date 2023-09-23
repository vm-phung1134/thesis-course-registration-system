import {
  CreateExerciseForm,
  CreatePostForm,
  ModalConfirm,
} from "@/components/Molecules";
import {
  ClassroomFound,
  ClassroomNotFound,
  Header,
  SidebarLecturerView,
  SidebarStudentView,
} from "@/components/Organisms";
import classNames from "classnames";
import Head from "next/head";
import { useState, FC, useEffect } from "react";
import { DATA_LIST_OPTIONS } from "./mock-data";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { ICategoryObject } from "@/interface/category";
import { IOptionItem } from "@/interface/filter";
import { useUserCookies } from "@/hooks/useCookies";
import { SnipperRound } from "@/components/Atoms";
import { useSubscribeStateContext } from "@/contexts/subscribeState";

export interface IClassroomProps {
  children: React.ReactNode;
  title: string;
}

export const ClassroomTemplate: FC<IClassroomProps> = ({ children, title }) => {
  const [userCookies] = useUserCookies();
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

  // HANDLE API
  const { subscribeState } = useSubscribeStateContext();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const timeOutLoading = setTimeout(() => {
      setLoading(false);
    }, 1300);
    return () => clearTimeout(timeOutLoading);
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 bg-base-100">
          <div className="col-span-2 border-r h-screen dark:border-gray-500">
            {userCookies?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <SidebarStudentView />
            ) : (
              <SidebarLecturerView />
            )}
          </div>
          <div className="col-span-10">
            <Header />
            {loading ? (
              <SnipperRound />
            ) : subscribeState?.classroom ? (
              <ClassroomFound
                classroom={subscribeState.classroom}
                setCreatePostModal={setCreatePostModal}
                openCreatePostModal={openCreatePostModal}
              >
                {children}
              </ClassroomFound>
            ) : (
              <ClassroomNotFound />
            )}
          </div>
          {/* POST / EXERCISE */}
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
{
  /* <ModalConfirm
            openModal={openModal}
            setOpenModal={setOpenModal}
            modalClass={modalClass}
            title="TCR Message!!!"
            message="Press ESC key or click the button below to close"
          /> */
}
