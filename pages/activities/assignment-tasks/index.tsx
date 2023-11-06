import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import { ExerciseCard } from "@/components/Molecules";
import { BREADCRUMB_ASSIGNMENT_TASKS, DATA_FILTER_TASKS } from "./mock-data";
import { IExerciseObject } from "@/interface/exercise";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useClassroomStateContext } from "@/contexts/classroomState";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import classNames from "classnames";
import { ExerciseModal } from "@/components/Organisms";

function AssignmentTasks() {
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
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // HANDLE EXERCISE
  const [openModalEx, setOpenModalEx] = useState<boolean>(false);
  const modalClassEx = classNames({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": openModalEx,
  });
  const handleOpenExModal = (task: IExerciseObject) => {
    setOpenModalEx?.(!openModalEx);
    dispatch(getExercise(task));
  };
  const dispatch = useAppDispatch();
  const { exercise } = useAppSelector((state) => state.exerciseReducer);
  const { authClassroomState } = useClassroomStateContext();
  const { data: exercises, isLoading } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", authClassroomState],
    queryFn: async () => {
      const action = await dispatch(getAllExerciseInClass(authClassroomState));
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <MainboardTemplate title="Assignment tasks | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_ASSIGNMENT_TASKS} />
            <div className="py-3 w-[70%]">
              <div className="my-3 py-2 flex gap-2 items-center">
                <h4 className="text-xl capitalize text-green-700 font-medium ">
                  Assignment <span className="text-orange-600"> Tasks</span>
                </h4>
                <div className="flex-grow h-[0.5px] bg-green-700"></div>
              </div>
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
              {exercises?.map((ex, index) => (
                <ExerciseCard
                  handleOpenTaskModal={handleOpenExModal}
                  key={ex.id}
                  exercise={ex}
                />
              ))}
            </div>
            <ExerciseModal
              modalClass={modalClassEx}
              exercise={exercise}
              setOpenModalEx={setOpenModalEx}
              openModalEx={openModalEx}
            />
          </>
        )}
      </MainboardTemplate>
    </>
  );
}

export default AssignmentTasks;
