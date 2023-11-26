import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

export interface IAuthTemplateProps {
  children: React.ReactNode;
  title: string;
}

export const AuthTemplate: FC<IAuthTemplateProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <div className="relative">
          <div className="relative bg-gray-900 bg-opacity-80 min-h-screen max-h-fit">
            <div className="">{children}</div>
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
