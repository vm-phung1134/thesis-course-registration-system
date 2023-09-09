import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, Spinner } from "@/components/Atoms";
import { BREADCRUMB_REPORT_DETAIL_PAGE } from "./mock-data";
import {
  ExerciseCard,
  PostReportCard,
  TargetTable,
} from "@/components/Molecules";

function ReportStageDetailPage() {
  const [loading, setLoading] = useState<boolean>(false);
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
        <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
          <Breadcrumb dataBreadcrumb={BREADCRUMB_REPORT_DETAIL_PAGE} />
          <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="col-span-8">
              <h4 className="uppercase text-green-700 font-medium py-2">
                post and expercise for this phase
              </h4>
              <PostReportCard />
              <PostReportCard />
              <ExerciseCard />
              <ExerciseCard />
            </div>
            <div className="col-span-4">
              <TargetTable namePhase="Requirement gathering">
                <svg
                  className="w-10 h-10 text-green-700 sm:w-20 sm:h-20"
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
              </TargetTable>
            </div>
          </div>
        </MainboardTemplate>
      )}
    </>
  );
}
export default ReportStageDetailPage;
