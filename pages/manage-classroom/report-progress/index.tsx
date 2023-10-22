import { DATA_STATE_REPORT } from "./mock-data";
import { StateReportThesis } from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";
import { ICategoryObject } from "@/interface/category";
import { getAllReportStage } from "@/redux/reducer/report-stage/api";
import { useAppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";

function ReportProgressTab() {
  const dispatch = useAppDispatch();
  const { data: reportStages } = useQuery<ICategoryObject[]>({
    queryKey: ["reportStages"],
    queryFn: async () => {
      const action = await dispatch(getAllReportStage());
      return action.payload;
    },
    initialData: [],
  });
  return (
    <ClassroomTemplate title="Report Grogress | Thesis course registration system">
      <div className="p-5 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-sm font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Report grogress
            </p>
          </div>
          <h2 className="max-w-lg mb-6 capitalize font-sans text-2xl font-bold leading-none tracking-wide text-gray-900 md:mx-auto">
            Stages of reporting the progress of the graduation thesis
          </h2>
        </div>
        <div className="grid gap-8 row-gap-0 lg:grid-cols-5">
          {reportStages?.map((stage) => {
            return <StateReportThesis key={stage.value} stage={stage} />;
          })}
        </div>
      </div>
    </ClassroomTemplate>
  );
}

export default ReportProgressTab;
