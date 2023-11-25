import { Navbar, SidebarAdminView } from "@/components/Organisms";
import Head from "next/head";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

export interface IAdminProps {
  children: React.ReactNode;
  title: string;
}

export const AdminTemplate: FC<IAdminProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="grid grid-cols-12 tracking-wide bg-base-100 dark:bg-[#0d0d0e] dark:text-[#dedede]">
          <div className="col-span-2 border-r h-screen dark:border-gray-500">
            <SidebarAdminView />
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
