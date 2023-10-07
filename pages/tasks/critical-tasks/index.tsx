import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  SnipperRound,
} from "@/components/Atoms";
import { BREADCRUMB_CRITICAL_TASKS, DATA_FILTER_TASKS } from "./mock-data";
import { ICategoryObject } from "@/interface/category";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import { ExerciseCard } from "@/components/Molecules";
import classNames from "classnames";
import { IExerciseObject } from "@/interface/exercise";
import {
  getAllExerciseInClass,
  getExercise,
} from "@/redux/reducer/exercise/api";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useClassroomStateContext } from "@/contexts/classroomState";
import { useQuery } from "@tanstack/react-query";
import { ExerciseModal } from "@/components/Organisms";

function CriticalTasks() {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
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
  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", authClassroomState?.classroom],
    queryFn: async () => {
      const action = await dispatch(
        getAllExerciseInClass(authClassroomState?.classroom)
      );
      return action.payload || [];
    },
    initialData: [],
  });
  return (
    <>
      <MainboardTemplate title="Critical tasks | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_CRITICAL_TASKS} />
            <div className="py-3 w-[70%]">
              <p className="font-bold uppercase text-xl py-2 text-green-700">
                Critical Tasks
              </p>
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
          </>
        )}
        <ExerciseModal
          modalClass={modalClassEx}
          exercise={exercise}
          setOpenModalEx={setOpenModalEx}
          openModalEx={openModalEx}
        />
      </MainboardTemplate>
    </>
  );
}

export default CriticalTasks;
