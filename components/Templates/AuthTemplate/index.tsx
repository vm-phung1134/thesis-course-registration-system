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
          <Image
            src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            className="absolute inset-0 object-cover w-full h-full"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="background login page"
          />
          <div className="relative bg-gray-900 bg-opacity-80 min-h-screen max-h-fit">
            <div className="">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
