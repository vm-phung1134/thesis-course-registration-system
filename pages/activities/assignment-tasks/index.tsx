import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  Spinner,
} from "@/components/Atoms";
import { ICategoryObject } from "@/interface/category";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";
import { ExerciseCard } from "@/components/Molecules";
import { BREADCRUMB_ASSIGNMENT_TASKS, DATA_FILTER_TASKS } from "./mock-data";

function AssignmentTasks() {
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
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Assignment tasks | Thesis course registration system">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_ASSIGNMENT_TASKS} />
          <div className="py-3 w-[70%]">
            <p className="font-bold uppercase text-xl py-2 text-green-700">
              Assignment Tasks
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
            <ExerciseCard />
            <ExerciseCard />
            <ExerciseCard />
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

export default AssignmentTasks;
