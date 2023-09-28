import { useState, useEffect } from "react";
import { MainboardTemplate } from "@/components/Templates";
import { Breadcrumb, SnipperRound, Spinner } from "@/components/Atoms";
import { BREADCRUMB_REPORT_DETAIL_PAGE } from "./mock-data";
import {
  ExerciseCard,
  PostReportCard,
  TargetTable,
} from "@/components/Molecules";
import { useQuery } from "@tanstack/react-query";
import { IPostObject } from "@/interface/post";
import { useAppDispatch } from "@/redux/store";
import { getAllPostInReportStage } from "@/redux/reducer/post/api";
import { useSubscribeStateContext } from "@/contexts/subscribeState";
import { useSearchParams } from "next/navigation";
import { getAllExerciseInReportStage } from "@/redux/reducer/exercise/api";
import { IExerciseObject } from "@/interface/exercise";

function ReportStageDetailPage() {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const id = params.get("reportID");
  const { subscribeState } = useSubscribeStateContext();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: posts } = useQuery<IPostObject[]>({
    queryKey: ["posts", subscribeState.classroom.id, id],
    queryFn: async () => {
      const action = await dispatch(
        getAllPostInReportStage({
          classroomId: subscribeState.classroom.id,
          categoryId: id,
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });

  const { data: exercises } = useQuery<IExerciseObject[]>({
    queryKey: ["exercises", subscribeState.classroom.id, id],
    queryFn: async () => {
      const action = await dispatch(
        getAllExerciseInReportStage({
          classroomId: subscribeState.classroom.id,
          categoryId: id,
        })
      );
      return action.payload || [];
    },
    initialData: [],
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <MainboardTemplate title="Mainboard Thesis | Thesis course registration system">
        {loading ? (
          <SnipperRound />
        ) : (
          <>
            <Breadcrumb dataBreadcrumb={BREADCRUMB_REPORT_DETAIL_PAGE} />
            <div className="grid grid-cols-12 gap-5 mt-5">
              <div className="col-span-8">
                <h4 className="uppercase text-green-700 font-medium py-2">
                  post and expercise for this phase
                </h4>
                {posts?.map((post, index) => (
                  <PostReportCard key={post.id} post={post} />
                ))}
                {exercises?.map((ex, index) => (
                  <ExerciseCard key={ex.id} exercise={ex} />
                ))}
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
          </>
        )}
      </MainboardTemplate>
    </>
  );
}
export default ReportStageDetailPage;
