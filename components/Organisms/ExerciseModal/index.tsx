import { SelectBox } from "@/components/Atoms";
import {
  CardStudentShort,
  CommentForm,
  ContentCommentModal,
  UploadFileForm,
} from "@/components/Molecules";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { ICategoryObject } from "@/interface/category";
import { IExerciseObject } from "@/interface/exercise";
import { IOptionItem } from "@/interface/filter";
import { ISubmitObject } from "@/interface/submit";
import { getAllSubmits, getSubmit } from "@/redux/reducer/submit/api";
import { useAppDispatch } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { DATA_FILTER_COURSE } from "../MainboardStatus/mock-data";
import Image from "next/image";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { convertDateTime, convertDateTimeFromString } from "@/utils/covertDate";

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
  const { currentUser } = useCurrentUserContext();
  const dispatch = useAppDispatch();
  const { data: submit } = useQuery<ISubmitObject[]>({
    queryKey: [
      "submit-exercise",
      { exerciseID: exercise.id, studentID: currentUser.id },
    ],
    queryFn: async () => {
      const action = await dispatch(
        getSubmit({ exerciseID: exercise.id, studentID: currentUser.id })
      );
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <dialog id="my_modal_exercise" className={modalClass}>
      <div className="w-8/12 bg-white py-5 px-3 h-fit shadow-2xl rounded-xl">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-8 border-r px-3">
            <div className="border-b pb-5">
              <div className="flex gap-5 items-center mb-2">
                <p className="text-xs px-3 rounded-sm py-1 bg-green-700 cursor-pointer text-white w-fit">
                  Exercise
                </p>
                <p>|</p>
                <p className="text-sm tracking-wider">
                  {exercise?.category?.label} Stage
                </p>
              </div>
              <h3 className="font-medium text-green-700 text-lg capitalize">
                {exercise?.title}
              </h3>
              <p className="font-medium capitalize py-1">
                {convertToUnaccentedString(exercise?.author?.name)}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs font-thin">
                  {convertDateTimeFromString(exercise?.updateAt || "")}{" "}
                  {`( Edited )`}
                </p>
                <p className="text-red-500 text-sm">
                  Deadline: {convertDateTime(exercise?.deadline)}
                </p>
              </div>
            </div>
            <div className="py-5 font-thin border-b text-sm">
              <p className="py-2 tracking-wider font-medium">
                General information
              </p>
              <ul className="font-normal indent-3">
                <li>{exercise?.description}</li>
                <li>At the report you will review what you are doing.</li>
              </ul>
              <div>
                <p className="py-2 font-medium">Document references</p>
                <div className="flex gap-3">
                  {exercise?.attachments?.map((arr, index) => {
                    return (
                      <div
                        key={arr.id}
                        className="flex gap-3 text-blue-700 font-medium rounded-md items-center px-3 py-2 bg-slate-100 shadow-md"
                      >
                        <Image
                          width={20}
                          height={20}
                          src={arr.thumbnail}
                          alt="icon-file-pdf"
                        />
                        <div>
                          <a
                            className="text-[13px]"
                            target="_blank"
                            key={index}
                            href={arr.fileURL}
                          >
                            {arr.fileName}
                          </a>
                          <p className="text-xs font-thin">{arr.mimeType}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3">
              <CommentForm task={exercise} />
              <ContentCommentModal quantity={5} task={exercise} />
            </div>
          </div>
          <div className="col-span-4 px-3">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Status report</h3>
              <button
                onClick={() => setOpenModalEx?.(!openModalEx)}
                className="btn pr-5 text-xs btn-sm bg-transparent btn-circle border-none hover:bg-transparent"
              >
                Close
              </button>
            </div>
            {currentUser?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <ReportStatusStudentView submit={submit} exercise={exercise} />
            ) : (
              <ReportStatusLecturerView exercise={exercise} />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

interface IReportStatusLecturerViewProps {
  exercise: IExerciseObject;
}

const ReportStatusLecturerView: FC<IReportStatusLecturerViewProps> = ({
  exercise,
}) => {
  const [selected, setSelected] = useState<IOptionItem | ICategoryObject>(
    DATA_FILTER_COURSE[0]
  );
  const dispatch = useAppDispatch();
  const { data: submission } = useQuery<ISubmitObject[]>({
    queryKey: ["classroom-submissions", exercise],
    queryFn: async () => {
      const action = await dispatch(getAllSubmits(exercise));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <div className="my-3 h-[1px]"></div>
      <div className="flex gap-3 my-3 pb-2 relative overflow-hidden">
        <div className="bg-green-700 transform rotate-45 absolute -top-[5.8rem] -left-36 bottom-0 h-[150px] w-full"></div>
        <p className="flex relative flex-col items-center flex-grow py-2 text-white">
          <span className="text-sm">Submitted</span>
          <span className="text-xl font-medium">{submission.length || 0}</span>
        </p>
        <p className="flex flex-col items-center flex-grow py-2">
          <span className="text-sm">Assignment</span>
          <span className="text-xl font-medium">15</span>
        </p>
      </div>
      <div className="flex justify-start mb-3">
        <SelectBox
          setSelected={setSelected}
          selected={selected}
          options={DATA_FILTER_COURSE}
        />
      </div>
      <div className="flex flex-wrap gap-2 overflow-y-scroll">
        {submission?.map((submit) => {
          return <CardStudentShort key={submit.id} submit={submit} />;
        })}
      </div>
    </>
  );
};

interface IReportStatusStudentViewProps {
  exercise: IExerciseObject;
  submit: ISubmitObject[];
}

export const ReportStatusStudentView: FC<IReportStatusStudentViewProps> = ({
  exercise,
  submit,
}) => {
  return (
    <>
      <div className="my-5 p-4 border rounded-xl">
        <div className="flex justify-between mb-5">
          <h4 className="text-sm text-black font-medium">Report on stage</h4>
          <p className="text-xs text-red-600 font-medium capitalize">
            {submit.length > 0 ? "Submitted" : "Lack"}
          </p>
        </div>
        <UploadFileForm submit={submit} exercise={exercise} />
      </div>
    </>
  );
};
