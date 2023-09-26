import { IConTitle } from "@/components/Atoms";
import { FC } from "react";

export interface IPostReportCardProps {}

export const PostReportCard: FC<IPostReportCardProps> = () => {
  return (
    <div className="border shadow-md flex mt-5 p-5 justify-between gap-10 text-sm">
      <div className="flex gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            className="fill-current text-orange-600 group-hover:text-cyan-600"
            fillRule="evenodd"
            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
            clipRule="evenodd"
          />
          <path
            className="fill-current text-orange-300 group-hover:text-cyan-300"
            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
          />
        </svg>
        <div className="flex flex-col gap-1">
          <p className="capitalize font-medium text-xs">
            Le huynh quoc bao
            <span className="normal-case font-normal"> has added new post</span>
          </p>
          <p className="font-medium">Day off</p>
        </div>
      </div>
      <IConTitle className="font-normal" title="Design phase">
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
        </svg>
      </IConTitle>
      <IConTitle className="text-gray-500 font-normal" title="No deadline">
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </IConTitle>
    </div>
  );
};
