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
import { useQuery } from "@tanstack/react-query";
import { IClassroomObject } from "@/interface/classroom";
import { useAppDispatch } from "@/redux/store";
import { getClassroom } from "@/redux/reducer/classroom/api";
import { IMemberObject } from "@/interface/member";
import { INITIATE_AUTH, INITIATE_COURSE, INITIATE_MEMBER } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { checkStateSubscribe } from "@/redux/reducer/auth/api";

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
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUser();
  const { data } = useQuery<IMemberObject>({
    queryKey: ["subscribe-state", currentUser],
    queryFn: async () => {
      const action = await dispatch(checkStateSubscribe(currentUser));
      return action.payload;
    },
    initialData: {
      classroom: INITIATE_COURSE,
      member: INITIATE_AUTH,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            {loading && data!==INITIATE_MEMBER ? (
              <SnipperRound />
            ) : data?.classroom ? (
              <ClassroomFound
                classroom={data.classroom}
                setCreatePostModal={setCreatePostModal}
                openCreatePostModal={openCreatePostModal}
              >
                {children}
              </ClassroomFound>
            ) : (
              <ClassroomNotFound />
            )}
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
