import {
  Navbar,
  SidebarLecturerView,
  SidebarStudentView,
} from "@/components/Organisms";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import Head from "next/head";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

export interface IMainboardProps {
  children: React.ReactNode;
  title: string;
}

export const MainboardTemplate: FC<IMainboardProps> = ({ children, title }) => {
  const { currentUser } = useCurrentUserContext();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 bg-base-100 tracking-wide dark:bg-[#141E37] dark:text-[#dedede]">
          <div className="col-span-2 border-r h-screen dark:border-gray-500">
            {currentUser?.role === ROLE_ASSIGNMENT.STUDENT && (
              <SidebarStudentView />
            )}
            {currentUser?.role === ROLE_ASSIGNMENT.LECTURER && (
              <SidebarLecturerView />
            )}
          </div>
          <div className="col-span-10">
            <Navbar />
            <div className="px-5 h-full border-l">{children}</div>
            <ToastContainer
              toastStyle={{
                color: "black",
                fontSize: "14px",
                fontFamily: "Red Hat Text",
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};
