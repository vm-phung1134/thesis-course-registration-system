import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { CriticalTask, ExerciseCard } from "@/components/Molecules";
import { IExerciseObject } from "@/interface/exercise";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import classNames from "classnames";
import { ExerciseModal } from "@/components/Organisms";
import { DATA_STATE_REPORT, INITIATE_EXERCISE } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { IBreadcrumbItem } from "@/components/Atoms";
import { IOptionItem } from "@/interface/filter";

export const BREADCRUMB_ASSIGNMENT_TASKS: IBreadcrumbItem[] = [
  {
    id: "1",
    href: "/",
    title: "TCR System",
  },
  {
    id: "2",
    href: "/",
    title: "Assigned tasks",
  },
  {
    id: "3",
    href: "/tasks-/critical-tasks",
    title: "Assignment tasks",
  },
];

export const DATA_FILTER_TASKS: IOptionItem[] = [
  {
    value: "a-z",
    label: "Name A - Z",
  },
  {
    value: "z-a",
    label: "Name Z - A",
  },
  {
    value: "recent day",
    label: "Recent day",
  },
];

function AssignmentTasks() {
  const [loading, setLoading] = useState<boolean>(true);
  const [exRenew, setExRenew] = useState<IExerciseObject>(INITIATE_EXERCISE);
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
  // HANDLE EXERCISE
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
  const { authClassroomState } = useClassroomStateContext();
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["classroom-exercises", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllExerciseInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });

  // HANDLE EXERCISE
  const { data: ex_fetch } = useQuery<IExerciseObject>({
    queryKey: ["exercise", exRenew],
    queryFn: async () => {
      const action = await dispatch(getExercise(exRenew));
      return action.payload || {};
    },
    initialData: exRenew,
  });

  const handleCriticalEx = (arr: IExerciseObject[]) => {
    return arr.sort(
      (a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <>
      <MainboardTemplate title="Assignment tasks | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Breadcrumb dataBreadcrumb={BREADCRUMB_ASSIGNMENT_TASKS} />
            <div className="my-3 py-2 flex gap-2 items-center">
              <h4 className="text-xl capitalize text-green-700 font-medium ">
                Assignment{" "}
                <span className="text-orange-600"> Report progress</span>
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
                {handleCriticalEx(exercises)?.map((ex, index) => (
                  <ExerciseCard
                    index={index}
                    handleOpenTaskModal={handleOpenExModal}
                    key={ex.id}
                    exercise={ex}
                  />
                ))}
              </div>
              <div className="w-4/12">
                {exercises.length > 0 ? (
                  <CriticalTask exercise={handleCriticalEx(exercises)[0]} />
                ) : (
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

export default AssignmentTasks;
