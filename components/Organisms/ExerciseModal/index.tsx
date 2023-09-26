import { Button } from "@/components/Atoms";
import {
  CardStudentShort,
  CommentForm,
  ContentComment,
  UploadFileForm,
} from "@/components/Molecules";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { useUserCookies } from "@/hooks/useCookies";
import { IExerciseObject } from "@/interface/exercise";
import { DATA_CARD_STUDENT } from "@/pages/manage-classroom/members/mock-data";
import { convertToUnaccentedString } from "@/utils/convertString";
import { FC } from "react";

export interface IExerciseModalProps {
  modalClass: string;
  setOpenModalEx?: React.Dispatch<React.SetStateAction<boolean>>;
  openModalEx?: boolean;
  exercise: IExerciseObject;
}

export const ExerciseModal: FC<IExerciseModalProps> = ({
  modalClass,
  setOpenModalEx,
  openModalEx,
  exercise,
}) => {
  const [userCookies] = useUserCookies();
  return (
    <dialog id="my_modal_2" className={modalClass}>
      <div className="w-8/12 bg-white p-5 h-fit shadow-2xl overflow-y-scroll">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-8 border-r px-3">
            <div className="border-b pb-5">
              <div className="flex gap-5 items-center mb-2">
                <p className="text-xs px-3 py-1 bg-green-700 cursor-pointer text-white w-fit">
                  {exercise?.type === "exercise" ? "Exercise" : "Message"}
                </p>
                <p>|</p>
                <p className="text-sm">{exercise?.category?.label} Stage</p>
              </div>
              <h3 className="font-medium uppercase text-green-700">
                {exercise?.title}
              </h3>
              <p className="font-medium uppercase py-1">
                {convertToUnaccentedString(exercise?.lecturer?.name)}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  {`20, August 2023 - `}
                  <span className="text-sm">{`12:36 AM (Edited)`}</span>
                </p>
                <p className="text-red-500 text-sm">
                  Deadline: 21, August 2023
                </p>
              </div>
            </div>
            <div className="py-5 font-thin border-b">
              <ul className="">
                <li>- {exercise?.description}</li>
                <li>- At the report you will review what you are doing.</li>
              </ul>
              <div>
                <p>@Attachments: </p>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3">
              <p className="text-[15px]">0 Comment for this report</p>
              <CommentForm task={exercise} />
              <ContentComment quantity={1} task={exercise} />
              <Button
                className="rounded-none w-full"
                title="View more comments"
              />
            </div>
          </div>
          <div className="col-span-4 px-3">
            <div className="flex justify-between">
              <h3 className="font-medium uppercase text-green-700">
                Status report
              </h3>
              <button
                onClick={() => setOpenModalEx?.(!openModalEx)}
                className="btn btn-sm  btn-circle border"
              >
                ✕
              </button>
            </div>
            {userCookies?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <ReportStatusStudentView />
            ) : (
              <ReportStatusLecturerView />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

const ReportStatusLecturerView = () => {
  return (
    <>
      <div className="flex gap-5 my-3 pb-2 border-b">
        <p>
          <span className="text-lg font-bold">1</span> submited
        </p>
        <p>
          <span className="text-lg font-bold">15</span> Assignment
        </p>
      </div>
      <div className="flex justify-start">
        <select className="select font-thin select-sm my-2 select-bordered rounded-none focus:outline-none max-w-xs">
          <option>Sort by name</option>
          <option>Large Apple</option>
          <option>Large Orange</option>
          <option>Large Tomato</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        {DATA_CARD_STUDENT.map((student) => {
          return <CardStudentShort key={student.id} student={student} />;
        })}
      </div>
    </>
  );
};

export const ReportStatusStudentView = () => {
  return (
    <>
      <div className="my-5 p-4 border shadow-md">
        <div className="flex justify-between mb-5">
          <h4 className="text-[13px] uppercase font-medium">
            Report on Design stage
          </h4>
          <p className="text-sm text-red-600">Lack</p>
        </div>
        <UploadFileForm />
      </div>
    </>
  );
};
