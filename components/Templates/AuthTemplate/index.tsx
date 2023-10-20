import Head from "next/head";
import Image from "next/image";
import { FC } from "react";

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
          </div>
        </div>
      </main>
    </>
  );
};
