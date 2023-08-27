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
          <StageReportThesis title="Requirement gathering" />
          <StageReportThesis title="Design" />
          <StageReportThesis title="Development" />
          <StageReportThesis title="Testing" />
          <StageReportThesis title="Deployment" />
        </div>
      </div>
    </ClassroomTemplate>
  );
}

const StageReportThesis = ({ title }: { title: string }) => {
  return (
    <div className="relative text-center">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 text-white sm:w-10 sm:h-10">
        <svg
          className="w-8 h-8 sm:w-8 sm:h-8"
          stroke="currentColor"
          viewBox="0 0 52 52"
        >
          <polygon
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            points="29 13 14 29 25 29 23 39 38 23 27 23"
          />
        </svg>
      </div>
      <h6 className="mb-2 text-base font-medium">{title}</h6>
      <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
        Lookout flogging bilge rat main sheet bilge water nipper fluke to go on
        account heave down clap
      </p>
      <button className="inline-flex text-sm items-center font-medium transition-colors duration-200">
        View report
      </button>
      <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
        {/* <svg
          className="w-4 text-gray-700 transform rotate-90 lg:rotate-0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <line
            fill="none"
            strokeMiterlimit="10"
            x1="2"
            y1="12"
            x2="22"
            y2="12"
          />
          <polyline
            fill="none"
            strokeMiterlimit="10"
            points="15,5 22,12 15,19 "
          />
        </svg> */}
      </div>
    </div>
  );
};

export default ReportProgressTab;
