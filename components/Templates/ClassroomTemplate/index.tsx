import { CreateExerciseForm, CreatePostForm } from "@/components/Molecules";
import {
  ClassroomFound,
  ClassroomNotFound,
  Navbar,
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
import { SnipperRound } from "@/components/Atoms";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useUserCookies } from "@/hooks/useCookies";
import { INITIATE_CLASSROOM } from "@/data";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { ToastContainer } from "react-toastify";

export interface IClassroomProps {
  children: React.ReactNode;
  title: string;
}

export const ClassroomTemplate: FC<IClassroomProps> = ({ children, title }) => {
  const [selected, setSelected] = useState<IOptionItem | ICategoryObject>(
    DATA_LIST_OPTIONS[0]
  );
  const [openCreatePostModal, setCreatePostModal] = useState<boolean>(false);
  const modalClassPost = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openCreatePostModal,
  });
  // HANDLE API
  const { currentUser } = useCurrentUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { authClassroomState } = useClassroomStateContext();
  useEffect(() => {
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
        <div className="grid grid-cols-12 bg-base-100 tracking-wide">
          <div className="col-span-2 border-r h-screen dark:border-gray-500">
            {currentUser?.role === ROLE_ASSIGNMENT.STUDENT && (
              <SidebarStudentView />
            )}
            {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
              <SidebarLecturerView />
            )}
          </div>
          <div className="col-span-10 tracking-wide">
            <Navbar />
            {loading ? (
              <SnipperRound />
            ) : (
              <>
                {authClassroomState !== null && (
                  <ClassroomFound
                    classroom={authClassroomState || INITIATE_CLASSROOM}
                    setCreatePostModal={setCreatePostModal}
                    openCreatePostModal={openCreatePostModal}
                  >
                    {children}
                  </ClassroomFound>
                )}
                {authClassroomState == null && <ClassroomNotFound />}
              </>
            )}
          </div>
          <ToastContainer
            toastStyle={{
              color: "black",
              fontSize: "14px",
              fontFamily: "Red Hat Text",
            }}
          />
          {/* POST / EXERCISE */}
          <dialog id="my_modal_3" className={modalClassPost}>
            <div className="w-5/12 bg-white p-5 h-fit shadow-2xl rounded-xl">
              {selected === DATA_LIST_OPTIONS[0] ? (
                <CreateExerciseForm
                  classroom={authClassroomState || INITIATE_CLASSROOM}
                  setToggleForm={setCreatePostModal}
                  toggleForm={openCreatePostModal}
                  selected={selected}
                  setSelected={setSelected}
                  options={DATA_LIST_OPTIONS}
                />
              ) : (
                <CreatePostForm
                  classroom={authClassroomState || INITIATE_CLASSROOM}
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
