import { CreateExerciseForm, CreatePostForm } from "@/components/Molecules";
import {
  ClassroomFound,
  ClassroomNotFound,
  Navbar,
  SidebarLecturerView,
  SidebarStudentView,
  WaitingClassroom,
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
import { useClassroomStateContext } from "@/contexts/authClassroomState";
import {
  getStatusCurrentUser,
  checkClassroomState,
  handleChooseClassroom,
} from "@/utils/classroomService";
import {
  INITIATE_CLASSROOM,
  INITIATE_MEMBER,
  STATE_AUTH_CLASSROOM,
} from "@/data";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { getClassroom } from "@/redux/reducer/classroom/api";
import { IClassroomObject } from "@/interface/classroom";
import { useAppDispatch } from "@/redux/store";
import { IMemberObject } from "@/interface/member";
import { getMember } from "@/redux/reducer/member/api";

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
  const { subscribeState } = useSubscribeStateContext();
  const [loading, setLoading] = useState<boolean>(true);
  const { data: classroom } = useQuery<IClassroomObject>({
    queryKey: ["classroom"],
    queryFn: async () => {
      const action = await dispatch(getClassroom(currentUser));
      return action.payload || {};
    },
    initialData: INITIATE_CLASSROOM,
  });

  const { data: member } = useQuery<IMemberObject>({
    queryKey: ["member"],
    queryFn: async () => {
      const action = await dispatch(getMember(currentUser));
      return action.payload || {};
    },
    initialData: INITIATE_MEMBER,
  });

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
            {currentUser?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <SidebarStudentView />
            ) : (
              <SidebarLecturerView />
            )}
          </div>
          <div className="col-span-10 tracking-wide">
            <Navbar />
            {loading ? (
              <SnipperRound />
            ) : (
              <>
                {classroom && currentUser.role === ROLE_ASSIGNMENT.LECTURER && (
                  <ClassroomFound
                    classroom={classroom}
                    setCreatePostModal={setCreatePostModal}
                    openCreatePostModal={openCreatePostModal}
                  >
                    {children}
                  </ClassroomFound>
                )}
                {member && currentUser.role === ROLE_ASSIGNMENT.STUDENT && (
                  <ClassroomFound
                    classroom={member?.classroom}
                    setCreatePostModal={setCreatePostModal}
                    openCreatePostModal={openCreatePostModal}
                  >
                    {children}
                  </ClassroomFound>
                )}
                {!member && !classroom && <ClassroomNotFound />}
              </>
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
