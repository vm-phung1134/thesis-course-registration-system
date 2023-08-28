import { DATA_STATE_REPORT } from "./mock-data";
import { StateReportThesis } from "@/components/Molecules";
import { ClassroomTemplate } from "@/components/Templates";

function ReportProgressTab() {
  return (
    <ClassroomTemplate title="Report Grogress | Thesis course registration system">
      <div className="p-5 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Report grogress
            </p>
          </div>
          <h2 className="max-w-lg mb-6 uppercase font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-xl md:mx-auto">
            Stages of reporting the progress of the graduation thesis
          </h2>
        </div>
        <div className="grid gap-8 row-gap-0 lg:grid-cols-5">
          {DATA_STATE_REPORT.map((stage) => {
            return <StateReportThesis key={stage.title} stage={stage} />;
          })}
        </div>
      </div>
    </ClassroomTemplate>
  );
}

export default ReportProgressTab;
