import { Button, SelectBox } from "@/components/Atoms";
import {
  CardStudentShort,
  CommentForm,
  ContentComment,
  UploadFileForm,
} from "@/components/Molecules";
import { ROLE_ASSIGNMENT } from "@/contexts/authContext";
import { INITIATE_SUBMIT } from "@/data";
import { useCurrentUser } from "@/hooks/useGetCurrentUser";
import { ICategoryObject } from "@/interface/category";
import { IExerciseObject } from "@/interface/exercise";
import { IOptionItem } from "@/interface/filter";
import { ISubmitObject } from "@/interface/submit";
import { DATA_CARD_STUDENT } from "@/pages/manage-classroom/members/mock-data";
import { getSubmit } from "@/redux/reducer/submit/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { convertToUnaccentedString } from "@/utils/convertString";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { DATA_LIST_OPTIONS } from "../ClassroomStatus/mock-data";
import { DATA_FILTER_COURSE } from "../MainboardStatus/mock-data";

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
  const { currentUser } = useCurrentUser();
  const dispatch = useAppDispatch();
  const { data: submit } = useQuery<ISubmitObject>({
    queryKey: ["submit"],
    queryFn: async () => {
      const action = await dispatch(
        getSubmit({ exerciseId: exercise.uid, studentId: currentUser.id })
      );
      return action.payload || {};
    },
    initialData: INITIATE_SUBMIT,
  });
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
                  Deadline: {exercise?.deadline}
                </p>
              </div>
            </div>
            <div className="py-5 font-thin border-b text-sm">
              <p className="py-2">General information</p>
              <ul className="font-normal indent-3">
                <li>{exercise?.description}</li>
                <li>At the report you will review what you are doing.</li>
              </ul>
              <div>
                <p className="py-2">Document references</p>
                <div className="flex gap-3">
                  {exercise?.attachments?.map((arr, index) => {
                    return (
                      <div
                        key={arr.id}
                        className="flex gap-4 border-blue-500 text-blue-700 items-center border px-3 py-1"
                      >
                        <i className="fa-regular fa-file-word"></i>
                        <a
                          className="text-[13px]"
                          target="_blank"
                          key={index}
                          href={arr.src}
                        >
                          {arr.name}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="py-5 flex flex-col gap-3">
              <CommentForm task={exercise} />
              <ContentComment quantity={1000} task={exercise} />
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
            {currentUser?.role === ROLE_ASSIGNMENT.STUDENT ? (
              <ReportStatusStudentView submit={submit} exercise={exercise} />
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
  const [selected, setSelected] = useState<IOptionItem | ICategoryObject>(
    DATA_FILTER_COURSE[0]
  );
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
      <div className="flex justify-start mb-3">
        <SelectBox
          setSelected={setSelected}
          selected={selected}
          options={DATA_FILTER_COURSE}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {DATA_CARD_STUDENT.map((student) => {
          return <CardStudentShort key={student.id} student={student} />;
        })}
      </div>
    </>
  );
};

interface IReportStatusStudentViewProps {
  exercise: IExerciseObject;
  submit: ISubmitObject;
}

export const ReportStatusStudentView: FC<IReportStatusStudentViewProps> = ({
  exercise,
  submit,
}) => {
  return (
    <>
      <div className="my-5 p-4 border shadow-md">
        <div className="flex justify-between mb-5">
          <h4 className="text-[13px] uppercase font-medium">
            Report on Design stage
          </h4>
          <p className="text-sm text-red-600 capitalize">
            {submit.status || "Lack"}
          </p>
        </div>
        <UploadFileForm submit={submit} exercise={exercise} />
      </div>
    </>
  );
};
