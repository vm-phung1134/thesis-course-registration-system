import { Button } from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import Link from "next/link";
import { FC } from "react";

export interface IStateReportThesisProps {
  stage: ICategoryObject;
}

export const StateReportThesis: FC<IStateReportThesisProps> = ({ stage }) => {
  return (
    <div className="relative text-center">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 text-white sm:w-10 sm:h-10">
        <svg
          className="w-8 h-8 sm:w-8 sm:h-8"
          stroke="currentColor"
          viewBox="0 0 52 52"
        >
          <polygon
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            points="29 13 14 29 25 29 23 39 38 23 27 23"
          />
        </svg>
      </div>
      <h6 className="mb-2 text-base font-medium capitalize">{stage?.label}</h6>
      <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
        {stage?.description}
      </p>
      <Link
        href={`/manage-classroom/report-progress/report-detail/${stage?.id}`}
      >
        <Button
          title="View report"
          className="inline-flex bg-transparent border-none text-sm items-center"
        />
      </Link>
      <div className="top-0 right-3 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
        <svg
          className="w-4 text-gray-700 transform rotate-90 lg:rotate-0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <line
            fill="none"
            strokeMiterlimit="10"
            x1="2"
            y1="12"
            x2="22"
            y2="12"
          />
          <polyline
            fill="none"
            strokeMiterlimit="10"
            points="15,5 22,12 15,19 "
          />
        </svg>
      </div>
    </div>
  );
};
