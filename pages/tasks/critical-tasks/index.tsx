import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import {
  Breadcrumb,
  SelectBox,
  SelectInForm,
  Spinner,
} from "@/components/Atoms";
import { BREADCRUMB_CRITICAL_TASKS, DATA_FILTER_TASKS } from "./mock-data";
import { ICategoryObject } from "@/interface/category";
import { DATA_STATE_REPORT } from "@/pages/manage-classroom/report-progress/mock-data";
import { IOptionItem } from "@/interface/filter";

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
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MainboardTemplate title="Critical tasks | Thesis course registration system">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_CRITICAL_TASKS} />
          <div className="py-3 w-[70%]">
            <p className="font-bold uppercase text-xl py-2 text-green-700">Critical Tasks</p>
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
            <CriticalTaskCard />
            <CriticalTaskCard />
            <CriticalTaskCard />
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}

const CriticalTaskCard = () => {
  return (
    <div className="border shadow-md flex mt-5 p-5 justify-between gap-10 text-sm">
      <p className="font-medium">Report progress thesis in stage</p>
      <p className="flex gap-2 items-center">
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
        </svg>
        <span>Stage Design</span>
      </p>
      <p className="flex gap-2 items-center">
        <svg
          className="w-4 h-4 fill-current inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="text-red-600">August, 09 2023</span>
      </p>
    </div>
  );
};

export default CriticalTasks;
