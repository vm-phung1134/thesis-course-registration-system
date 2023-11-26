import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { BREADCRUMB_COMPLETED_TASKS } from "./mock-data";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import { ICategoryObject } from "@/interface/category";
import { DATA_FILTER_TASKS } from "../critical-tasks/mock-data";
import {
  CriticalTask,
  ExerciseCard,
  PostReportCard,
} from "@/components/Molecules";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IExerciseObject } from "@/interface/exercise";
import { useQuery } from "@tanstack/react-query";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import classNames from "classnames";
import { ExerciseModal } from "@/components/Organisms";
import Image from "next/image";
import { INITIATE_EXERCISE } from "@/data";
import { ISubmitObject } from "@/interface/submit";
import { getAllSubmitStud } from "@/redux/reducer/submit/api";
import { getExerciseWithNearestDeadline } from "@/utils/getDeadline";
import { useCurrentUserContext } from "@/contexts/currentUserContext";
import { motion } from "framer-motion";

function CriticalTasks() {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStage, setSelectedStage] = useState<ICategoryObject>({
    id: "",
    label: "Select stage",
    value: "",
    description: "",
  });
  const [selectedFilter, setSelectedFilter] = useState<
    IOptionItem | ICategoryObject
  >({
    label: "Filter tasks",
    value: "",
  });
  // EXERCISE
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClassEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx(!openModalEx);
    setExRenew(task);
  };
  const dispatch = useAppDispatch();
  const { currentUser } = useCurrentUserContext();
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
  const { authClassroomState } = useClassroomStateContext();
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["classroom-exercises", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllExerciseInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });

  const { data: ex_fetch } = useQuery<IExerciseObject>({
    queryKey: ["get-one-exercise", exRenew],
    queryFn: async () => {
      const action = await dispatch(getExercise(exRenew));
      return action.payload || {};
    },
    initialData: exRenew,
  });

  const { data: submission } = useQuery<ISubmitObject[]>({
    queryKey: ["classroom-submission", currentUser],
    queryFn: async () => {
      const action = await dispatch(getAllSubmitStud(currentUser));
      return action.payload || [];
    },
    initialData: [],
  });

  const checkCompletedTask = (
    ex: IExerciseObject[],
    submits: ISubmitObject[]
  ) => {
    return ex?.filter((item) =>
      submits.some(
        (sub) => sub.exerciseId === item.id && sub.student.id === currentUser.id
      )
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <>
      <MainboardTemplate title="Task completed | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumb dataBreadcrumb={BREADCRUMB_COMPLETED_TASKS} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Completed{" "}
                <span className="text-orange-500"> Report progress</span>
              </h4>
              <div className="flex-grow h-[0.5px] bg-green-700"></div>
            </div>
            <div className="flex gap-5">
              <div className="py-3 w-8/12">
                <div className="flex items-center gap-5">
                  <div className="flex-grow">
                    <SelectInForm
                      options={DATA_STATE_REPORT}
                      selectedStage={selectedStage}
                      setSelectedStage={setSelectedStage}
                    />
                  </div>
                  <div className="flex-grow mt-2">
                    <SelectBox
                      setPadding="lg"
                      setSelected={setSelectedFilter}
                      selected={selectedFilter}
                      options={DATA_FILTER_TASKS}
                    />
                  </div>
                </div>
                {checkCompletedTask(exercises, submission)?.map((ex, index) => (
                  <ExerciseCard
                    handleOpenTaskModal={handleOpenExModal}
                    key={ex.id}
                    exercise={ex}
                    index={index}
                  />
                ))}
                {exercises.length === 0 && (
                  <div className="h-60 flex flex-col justify-center items-center p-5 mt-5">
                    <Image
                      src="https://yi-files.s3.eu-west-1.amazonaws.com/products/794000/794104/1354385-full.jpg"
                      width="200"
                      height="200"
                      className="-hue-rotate-[38deg] saturate-[.85]"
                      alt=""
                    />
                    <p className="text-lg text-gray-400">
                      Ops! We do not have exercise or post for you today
                    </p>
                  </div>
                )}
              </div>
              <div className="w-4/12">
                {exercises.length > 0 &&
                getExerciseWithNearestDeadline(exercises) ? (
                  <CriticalTask
                    submission={submission}
                    exercise={getExerciseWithNearestDeadline(exercises)}
                  />
                ) : (
                  <>
                    <div className="h-60 flex gap-5 flex-col justify-center shadow-xl items-center p-5 border rounded-xl">
                      <Image
                        src="https://cdn-icons-gif.flaticon.com/8121/8121267.gif"
                        width="50"
                        height="50"
                        className="-hue-rotate-[38deg] saturate-[.85]"
                        alt=""
                      />
                      <p className="font-medium text-green-700">
                        OPS! Not have any critical task for you today
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <ExerciseModal
              modalClass={modalClassEx}
              exercise={ex_fetch}
              setOpenModalEx={setOpenModalEx}
              openModalEx={openModalEx}
            />
          </motion.div>
        )}
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
